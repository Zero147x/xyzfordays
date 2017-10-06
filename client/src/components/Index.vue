<template>
<b-row>

      <b-col sm="6">
        
        <b-row>
            <b-nav class="ml-auto mr-3" tabs fill>
              <b-nav-item :to="{name: 'Index', params: {community: $route.params.community}}">
                {{this.$route.params.community}}
              </b-nav-item>
              <b-nav-item :to="{name: 'Edit'}">
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
            placeholder="type something"
            >
            
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
                <span :class="{admin: user.isAdmin}" v-if="user.isAdmin" v-html="user.username" />
                <span :class="{superAdmin: user.superAdmin}" v-if="user.superAdmin" v-html="user.username" />
                <span v-if="!user.isAdmin && !user.superAdmin" v-html="user.username" /><b-badge>1</b-badge>
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

export default {
  components: {
    NotFound
  },
  data () {
    return {
      user: [],
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
        username: this.$store.state.user,
        name: this.$store.state.room
      })
    },
    newMessage: function (data) {
      this.sentMessage.push({
        username: data.user.username,
        message: data.message,
        isAdmin: data.user.isAdmin,
        superAdmin: data.user.superAdmin
      })
      this.scrollToEnd()
    },
    update: function (data) {
      this.sentMessage.push({
        username: data.user.username,
        message: data.message,
        isAdmin: data.user.isAdmin,
        superAdmin: data.user.superAdmin
      })
      this.scrollToEnd()
    },
    updateUsers: function (data) {
      this.$store.dispatch('socket_users', data.users)
      this.users = data.users
    },
    updateRoom: function (data) {
      console.log(data)
      this.$store.dispatch('socket_room', data.room)
    },
    updateLocal: function (data) {
      this.$store.dispatch('socket_users', data.users)
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
      if (!this.$store.state.room) {
        this.$socket.emit('join', {
          user: this.$store.state.user,
          name: this.$route.path
        }, this.$route.params)
      }
    },
    disconnect () {
      if (this.$store.state.room === this.$route.path) {
        this.$socket.emit('leave', {
          username: this.$store.state.user,
          name: this.$store.state.room
        })
      }
    }
  },
  async beforeMount () {
    try {
      const exists = await CommunityService.index(this.$route.path)
      if (exists.data.error) {
        this.$router.push({
          name: 'Community'
        })
      }
    } catch (err) {
      console.log('error with request')
    }
  },
  beforeDestroy: function () {
    this.$socket.emit('leave', {
      username: this.$store.state.user,
      name: this.$store.state.room
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