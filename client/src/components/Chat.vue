<template>
  <b-col sm="12" md="9" xl="10">
     <b-card class="text-left _chat" no-body>
       <b-tabs ref="tabs" card>
          <b-tab :title="this.$route.params.community">
            <b-col sm="12" id="chat">
              <b-list-group id="chat_message_list" flush>
                <b-list-group-item id="chat_message_list_item" class="p-0"
                v-for="message in sentMessage"
                :key="message.username">
                    <span>[{{message.timeStamp}}]</span>
                    <span class="user" :class="{admin: message.isAdmin}">{{message.username}}</span> --
                    <span>{{message.message}}</span>
                </b-list-group-item>
              </b-list-group>
            </b-col>
          </b-tab>
        </b-tabs>
      </b-card>
      
    <b-col sm="12" class="p-0">
      <b-row class="mr-0 ml-0">
        <b-col sm="10" class="p-0">
          <b-form-input @keyup.enter.native="send"
            v-model="message"
            type="text"
            placeholder="type something">
          </b-form-input>
        </b-col>
          
        <b-col xs="2" sm="2" class="p-0 text-left">
          <b-btn variant="success" @click="send"
           class="send_btn">
            SEND
          </b-btn>
        </b-col>
      </b-row>
    </b-col>
  </b-col>
</template>
<script>
import CommunityService from '../services/CommunityService'
import _ from 'lodash'
import TimeStamp from '../utils/TimeStamp'

export default {
  data () {
    return {
      message: '',
      sentMessage: []
    }
  },
  sockets: {
    newMessage: function (val) {
      let date = new Date()
      let dateFormat = TimeStamp.date(date)
      this.sentMessage.push({
        timeStamp: dateFormat,
        username: val.username,
        message: val.message,
        isAdmin: val.status.isAdmin,
        superAdmin: val.status.superAdmin,
      })
      this.scrollToEnd()
    },
    update: function (val) {
      let date = new Date()
      let dateFormat = TimeStamp.date(date)
      this.sentMessage.push({
        timeStamp: dateFormat,
        username: val.username,
        message: val.message,
        isAdmin: val.status.isAdmin,
        superAdmin: val.status.superAdmin
      })
      this.scrollToEnd()
    },
    greeting: function (val) {
      let date = new Date()
      let dateFormat = TimeStamp.date(date)
      if (val.message) {
        this.sentMessage.push({
          timeStamp: dateFormat,
          message: val.message
        })
      }
    }
  },
  methods: {
    scrollToEnd: _.debounce(function () {
      const chat = this.$el.querySelector('.tab-content')
      var shouldScroll = chat.scrollTop + chat.clientHeight === chat.scrollHeight
      if (!shouldScroll) {
        chat.scrollTop = chat.scrollHeight
      }
    }, 50),
    send () {
      if (this.message !== '') {
        this.$socket.emit('message', {
          message: this.message,
          name: this.$route.path
        })
        this.message = ''
      }
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
  text-align: left !important;
}
.send_btn {
  width: 100%;
}
.tab-content {
  height: 80vh;
  overflow-y: auto;
}
.tab-content::-webkit-scrollbar {
  width: 5px;
  background-color: #F5F5F5
}
.tab-content::-webkit-scrollbar-thumb {
    background: #DCDCDC
}
.tab-content::-webkit-scrollbar-track {
    background: #424242
}
#chat_message_list_item {
  border-style: none !important;
}
</style>