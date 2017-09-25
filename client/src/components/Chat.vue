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
          <v-btn @click="click"
          small
          primary
          dark>
            Send
          </v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>
<script>
import chatService from '../services/ChatService'
import _ from 'lodash'

export default {
  data () {
    return {
      message: '',
      sentMessage: [],
      users: []
    }
  },
  sockets: {
    connect: function () {
      console.log('Connected to socket!')
    },
    user: function (user) {
      this.users.push(user)
    }
  },
  methods: {
    scrollToEnd: _.debounce(function () {
      const chat = this.$el.querySelector('#chat')
      chat.scrollTop = chat.scrollHeight
    }, 50),
    async click () {
      console.log(this.$users)
      await chatService.sendMessage({message: this.message})
    }
  },
  mounted () {
    this.$options.sockets.message = (val) => {
      console.log(val)
      this.sentMessage.push(val.message)
      this.scrollToEnd()
    }
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