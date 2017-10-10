<template>
<b-row>

      <b-col sm="6">
        
        <b-row>
            <b-nav class="ml-auto mr-3" tabs fill>
              <b-nav-item :to="{name: 'Index', params: {community: $route.params.community}}">
                {{this.$route.params.community}}
              </b-nav-item>
              <b-nav-item v-if="this.owner" :to="{name: 'Edit'}">
                edit
              </b-nav-item>
            </b-nav>
        </b-row>
        
        <b-card class="text-left" id="chat">
            <ul class="pl-2 pb-0">
              <li v-for="message in sentMessage">
                <span :class="{admin: message.isAdmin, superAdmin: message.superAdmin}" v-html="message.username" /> -- <span v-html="message.message" />
              </li>
            </ul>
        </b-card>
      
      <b-row>
        <b-col sm="11 pr-0">
          <b-form-input @keyup.enter.native="send"
            v-model="message"
            type="text"
            placeholder="type something">
          </b-form-input>
        </b-col>
        
        <b-col sm="1 pl-0">
          <b-btn variant="success" @click="send"
           class="send_btn">
            SEND
          </b-btn>
        </b-col>
      </b-row>
      </b-col>
      
        <b-col sm="4" md="3" lg="2">
          <b-row>
            <b-button block variant="primary"
            @click="connect">
              Connect
            </b-button>
          </b-row>
          <b-row>
            <b-button block variant="primary"
            @click="disconnect">
              Disconnect
            </b-button>
          </b-row>
          
          <b-row>
          <div id="usersList" class = "text-xs-left">
            <ul>
              <li v-for="user in this.$store.state.users">
                <span :class="{admin: user.status.isAdmin}" v-if="user.status.isAdmin" v-html="user.username" />
                <span :class="{superAdmin: user.status.superAdmin}" v-if="user.status.superAdmin" v-html="user.username" />
                <span v-if="!user.status.isAdmin && !user.status.superAdmin" v-html="user.username" /><b-badge>1</b-badge>
              </li>
            </ul>
          </div>
          </b-row>
          
        </b-col>
  </b-row>
</template>
<script>
import NotFound from './NotFound'
import CommunityService from '../services/CommunityService'
import _ from 'lodash'
import config from '@/config/config'

export default {
  components: {
    NotFound
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
        this.$socket.emit('join', this.$route.params.community )
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
  }
}

</script>

<style>
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
#usersList {
  overflow-y: auto;
}
/*.message_field {*/
/*  margin-top:5px;*/
/*}*/
/*.send_btn {*/
/*  margin-top:18px;*/
/*}*/
ul {
  list-style:none;
}
</style>