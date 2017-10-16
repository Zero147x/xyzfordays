<template>
  <b-row class="chat_container">
    <b-col sm="5" class="pr-0">
      <b-col sm="12">
        <b-row>
          <b-nav class="ml-auto" tabs fill>
            <b-nav-item :to="{name: 'Index', params: {community: $route.params.community}}">
              {{this.$route.params.community}}
            </b-nav-item>
            <b-nav-item v-if="this.owner" :to="{name: 'Edit'}">
              edit
            </b-nav-item>
          </b-nav>
        </b-row>
      </b-col>
       <b-card class="text-left" id="chat">
        <ul class="pl-2 pb-0">
          <li v-for="message in sentMessage">
            <span :class="{admin: message.isAdmin, superAdmin: message.superAdmin}" v-html="message.username" /> -- <span v-html="message.message" />
          </li>
        </ul>
      </b-card>
        
      <b-col sm="12" class="p-0">
        <b-row class="mr-0 ml-0">
          <b-col sm="9" class="p-0">
            <b-form-input @keyup.enter.native="send"
              v-model="message"
              type="text"
              placeholder="type something">
            </b-form-input>
          </b-col>
            
          <b-col sm="3" class="p-0 text-left">
            <b-btn variant="success" @click="send"
             class="send_btn">
              SEND
            </b-btn>
          </b-col>
        </b-row>
      </b-col>
    </b-col>
      
    <b-col sm="12" md="4" lg="2">
      <b-card class="users_card">
        <b-col sm="12">
          <drop-down
          v-for="user in this.$store.state.users" 
          :key="user.username"
          v-if="user.status.isAdmin"
          :class="{admin: user.status.isAdmin}"
          :user="user.username"/>
        </b-col>
        <b-col sm="12">
          <drop-down
          v-for="user in this.$store.state.users" 
          :key="user.username"
          v-if="!user.status.isAdmin"
          :class="{user: !user.status.isAdmin}"
          :user="user.username"/>
        </b-col>
      </b-card>
    </b-col>
        
    <!--<b-col sm="4" md="3" lg="2">-->
    <!--  <b-row>-->
    <!--    <b-button block variant="primary"-->
    <!--    @click="connect">-->
    <!--      Connect-->
    <!--    </b-button>-->
    <!--  </b-row>-->
    <!--  <b-row>-->
    <!--    <b-button block variant="primary"-->
    <!--    @click="disconnect">-->
    <!--      Disconnect-->
    <!--    </b-button>-->
    <!--  </b-row>-->
    <!--</b-col>-->
  </b-row>
</template>
<script>
import NotFound from './NotFound'
import CommunityService from '../services/CommunityService'
import DropDown from './DropDown'
import _ from 'lodash'

export default {
  components: {
    NotFound,
    DropDown
  },
  data () {
    return {
      owner: false,
      message: '',
      sentMessage: []
    }
  },
  sockets: {
    connect: function () {
      console.log('Connected to socket!')
    },
    disconnect: function () {
      this.$socket.emit('leave', {
        c: this.$store.state.room
      })
      this.$store.dispatch('socket_room', null)
      this.$store.dispatch('socket_users', null)
    },
    newMessage: function (val) {
      this.sentMessage.push({
        username: val.username,
        message: val.message,
        isAdmin: val.status.isAdmin,
        superAdmin: val.status.superAdmin
      })
      const chat = this.$el.querySelector('#chat')
      var shouldScroll = chat.scrollTop + chat.clientHeight === chat.scrollHeight
      if (!shouldScroll) {
        this.scrollToEnd()
      }
    },
    update: function (val) {
      this.sentMessage.push({
        username: val.username,
        message: val.message,
        isAdmin: val.status.isAdmin,
        superAdmin: val.status.superAdmin
      })
      const chat = this.$el.querySelector('#chat')
      var shouldScroll = chat.scrollTop + chat.clientHeight === chat.scrollHeight
      if (!shouldScroll) {
        this.scrollToEnd()
      }
    },
    updateUsers: function (val) {
      this.$store.dispatch('socket_users', val)
    },
    updateLocal: function (val) {
      this.$store.dispatch('socket_users', val.users)
    },
    updateRoom: function (val) {
      this.$store.dispatch('socket_room', val)
    },
    greeting: function (val) {
      this.sentMessage.push({
        message: val.message
      })
    }
  },
  methods: {
    scrollToEnd: _.debounce(function () {
      const chat = this.$el.querySelector('#chat')
      chat.scrollTop = chat.scrollHeight
    }, 50),
    send () {
      if (this.message !== '') {
        this.$socket.emit('message', {
          message: this.message,
          name: this.$route.path
        })
      }
    },
    async connect () {
      if (!this.$store.state.room && this.$store.state.user) {
        this.$socket.emit('join', this.$route.params.community)
      }
    },
    disconnect () {
      this.$socket.emit('leave', {
        c: this.$route.params.community
      })
    }
  },
  watch: {
    '$route': async function () {
      try {
        const exists = await CommunityService.index(this.$route.path)
        if (exists.data.error) {
          this.$router.push({
            name: 'Search'
          })
        }
      } catch (err) {
        console.log('error with request')
      }
    }
  },
  async beforeMount () {
    try {
      const exists = await CommunityService.index(this.$route.path)
      if (exists) {
        this.connect()
      }
      if (exists.data.error) {
        this.$router.push({
          name: 'Search'
        })
      } else if (exists.data.UserId === this.$store.state.user.id) {
        this.owner = true
      }
    } catch (err) {
      console.log('error with request')
    }
  },
  beforeDestroy: function () {
    this.$socket.emit('leave', {
      c: this.$store.state.room
    })
  },
  computed: {
    admin () {
      return this.$store.state.getters.admin
    }
  }
}

</script>

<style>
.users_card > div {
  padding: 0;
}
.users_card {
  height: 100%;
  overflow-y: auto;
}
.send_btn {
  width: 100%;
}
#chat {
  overflow-y: auto;
  height: 780px
}
#chat::-webkit-scrollbar {
  width: 5px;
  background-color: #F5F5F5
}
#chat::-webkit-scrollbar-thumb {
    background: #DCDCDC
}
#chat::-webkit-scrollbar-track {
    background: #424242
}
ul {
  list-style:none;
}
</style>