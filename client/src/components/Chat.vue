<template>
  <v-layout>
    <v-flex xs1>
      <div id="usersList" class = "text-xs-left white elevation-2">
        <ul>
          <li v-for="user in users">
            {{ user }}
          </li>
        </ul>
      </div>
    </v-flex>
    <v-flex xs6>
      <div id="chat" class = "text-xs-left white elevation-2">
        <ul>
          <li v-for="message in sentMessage">
            {{ message }}
          </li>
        </ul>
      </div>

      
      <v-layout row wrap>
        <v-flex xs12 sm8>
          <v-text-field
            v-model="message"
            label="Type something"
            single-line
            full-width
            hide-details>
            
          </v-text-field>
        </v-flex>
        
        <v-flex xs12 sm4 class="send_btn">
          <v-btn @click="send"
          small
          primary
          dark>
            Send
          </v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs1>
      <v-btn
      primary
      medium
      dark
      @click="connect">
        Connect
      </v-btn>
      <v-btn
      primary
      medium
      dark
      @click="disconnect">
        Disconnect
      </v-btn>
    </v-flex>
  </v-layout>
</template>
<script>
// import chatService from '../services/ChatService'
import _ from 'lodash'

export default {
  data () {
    return {
      message: '',
      sentMessage: [],
      users: null
    }
  },
  sockets: {
    connect: function () {
      console.log('Connected to socket!')
    },
    userList: function (users) {
      this.users = users
    },
    newMessage: function (data) {
      this.sentMessage.push(data.message)
      this.scrollToEnd()
    },
    update: function (data) {
      this.sentMessage.push(data)
      this.scrollToEnd()
    },
    updateUsers: function (data) {
      console.log(data[this.$socket.id])
      this.users = data
    }
  },
  methods: {
    scrollToEnd: _.debounce(function () {
      const chat = this.$el.querySelector('#chat')
      chat.scrollTop = chat.scrollHeight
    }, 50),
    send () {
      this.$socket.emit('message', {
        message: this.message
      })
      console.log(this.$socket.id)
    },
    connect () {
      var room = 'chat'
      this.$socket.emit('join', {
        user: this.$store.state.user.username,
        room: room
      })
    },
    disconnect () {
      var room = 'chat'
      this.$socket.emit('leave', {
        room: room
      })
    }
  },
  mounted () {
    this.$socket.emit('user', this.$store.state.user.username)
  }
}
</script>

<style>
#chat {
  height: 400px;
  overflow-y: auto;
}
#usersList {
  height:400px;
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