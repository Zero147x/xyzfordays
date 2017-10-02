<template>
  <v-layout>
    <v-flex xs12 md7 offset-md2>
      <v-card id="chat" height="780px" class = "text-xs-left elevation-2">
          <ul>
            <li v-for="message in sentMessage">
              <span :class="{active: message.isAdmin}">{{message.username}}</span> -- {{ message.message }}
            </li>
          </ul>
      </v-card>

      
      <v-layout row wrap>
        <v-flex d-flex xs11>
          <v-text-field @keyup.enter="send"
            v-model="message"
            label="Type something"
            single-line
            full-width
            hide-details>
            
          </v-text-field>
        </v-flex>
        
        <v-flex d-flex xs1 class="send_btn">
          <v-btn @click="send"
          small
          primary
          dark class="red white--text">
            SEND
          </v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12 md2>
      <layout row wrap>
        <v-flex d-flex>
          <v-btn
          primary
          medium
          dark
          @click="connect">
            Connect
          </v-btn>
        </v-flex>
        <v-flex d-flex>
          <v-btn
          primary
          medium
          dark
          @click="disconnect">
            Disconnect
          </v-btn>
        </v-flex>
        <v-flex d-flex xs12>
          <div id="usersList" class = "text-xs-left">
            <ul>
              <li v-for="user in this.$store.state.users">
                <span class="admin" v-if="user.isAdmin == true">{{user.username}}</span>
                <span v-if="user.isAdmin == false">{{user.username}}</span>
              </li>
            </ul>
          </div v-else>
        </v-flex>
      </layout>
    </v-flex>
  </v-layout>
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
      sentMessage: [],
      community: null,
      isAdmin: this.$store.state.isAdmin
    }
  },
  sockets: {
    connect: function () {
      console.log('Connected to socket!')
    },
    disconnect: function () {
      this.$store.dispatch('socket_users', null)
      this.$store.dispatch('socket_room', null)
    },
    newMessage: function (data) {
      this.sentMessage.push({
        username: data.user.username,
        message: data.message,
        isAdmin: data.user.isAdmin
      })
      this.scrollToEnd()
    },
    update: function (data) {
      this.sentMessage.push({
        username: data.user.username,
        message: data.message,
        isAdmin: data.user.isAdmin
      })
      this.scrollToEnd()
    },
    updateUsers: function (data) {
      this.$store.dispatch('socket_users', data.users)
      this.users = data.users
    },
    updateRoom: function (data) {
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
  watch: {
    '$route': async function (value) {
      try {
        this.$socket.emit('leave', {
          name: this.$store.state.room
        })
        const exists = await CommunityService.index(this.$route.path)
        if (exists.data.error) {
          this.$router.push({
            name: 'Community'
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
          name: 'Community'
        })
      }
    } catch (err) {
      console.log('error with request')
    }
  }
}
</script>

<style>
.active {
  color:red;
}
#chat {
  overflow-y: auto;
}
#chat::-webkit-scrollbar {
  width: 5px;
  background-color: #F5F5F5;
}
#chat::-webkit-scrollbar-thumb {
    background: #DCDCDC
}
#chat::-webkit-scrollbar-track {
    background: #424242
}
.admin {
  color:red;
}
#usersList {
  overflow-y: auto;
}
.message_field {
  margin-top:5px;
}
.send_btn {
  margin-top:18px;
}
ul {
  list-style:none;
}
</style>