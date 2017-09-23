<template>
  <v-layout>
    <v-flex xs6 offset-xs3>
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
      sentMessage: []
    }
  },
  sockets: {
    connect: function () {
      console.log('Connected to socket!')
    }
  },
  methods: {
    scrollToEnd: _.debounce(function () {
      const chat = this.$el.querySelector('#chat')
      chat.scrollTop = chat.scrollHeight
    }, 50),
    async click () {
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