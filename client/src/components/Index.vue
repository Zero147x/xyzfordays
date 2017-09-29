<template>
  <v-layout>
    <v-flex xs12 md7 offset-md2>
      <div id="chat" class = "text-xs-left elevation-2">
        <ul>
          <li v-for="message in sentMessage">
            {{ message }}
          </li>
        </ul>
      </div>

      
      <v-layout row wrap>
        <v-flex d-flex xs11>
          <v-text-field
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
          <div v-if="this.$store.state.users" id="usersList" class = "text-xs-left">
            <ul>
              <li v-for="user in this.$store.state.users">
                {{ user }}
              </li>
            </ul>
          </div>
        </v-flex>
      </layout>
    </v-flex>
  </v-layout>
</template>
<script>
import _ from 'lodash'

export default {
  data () {
    return {
      message: '',
      sentMessage: []
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
      this.sentMessage.push(data.user + ': ' + data.message)
      this.scrollToEnd()
    },
    update: function (data) {
      this.sentMessage.push(data)
      this.scrollToEnd()
    },
    updateUsers: function (data) {
      this.$store.dispatch('socket_users', data.users)
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
      this.$socket.emit('message', {
        message: this.message,
        name: this.$route.path
      })
      console.log(this.$socket.id)
    },
    connect () {
      if (!this.$store.state.room) {
        this.$socket.emit('join', {
          user: this.$store.state.user.username,
          name: this.$route.path
        })
      }
    },
    disconnect () {
      if (this.$store.state.room === this.$route.path) {
        this.$socket.emit('leave', {
          name: this.$store.state.room
        })
      }
    }
  },
  mounted () {
  }
}
</script>

<style>
#chat {
  height: 780px;
  overflow-y: auto;
}
#usersList {
  /*height:px;*/
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