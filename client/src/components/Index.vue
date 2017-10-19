<template>
  <b-row class="chat_container">
    <b-col sm="12" md="9" lg="9" xl="7" class="pr-0 pl-0">
       <b-card class="text-left _chat" no-body>
         <b-tabs ref="tabs" card>
            <b-tab :title="this.$route.params.community">
              <b-col sm="12" id="chat">
                <b-list-group id="chat_message_list" flush>
                  <b-list-group-item id="chat_message_list_item" class="p-0"
                  v-for="message in sentMessage"
                  :key="message.username">
                    <span :class="{admin: message.isAdmin}">{{message.username}}</span> --
                    <span>{{message.message}}</span>
                  </b-list-group-item>
                </b-list-group>
              </b-col>
            </b-tab>
            <b-tab v-if="this.$store.getters.admin" title="Edit">
              <edit></edit>
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
      
    <b-col cols="3" xl="2" class="d-none d-md-block">
      <b-card class="users_card">
        <drop-down
        v-for="user in this.$store.state.users"
        :key="user.username"
        :user="user"/>
      </b-card>
    </b-col>
  </b-row>
</template>
<script>
import CommunityService from '../services/CommunityService'
import DropDown from './DropDown'
import Edit from './Edit'
import _ from 'lodash'

export default {
  components: {
    Edit,
    DropDown
  },
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
      this.scrollToEnd()
    },
    update: function (val) {
      this.sentMessage.push({
        username: val.username,
        message: val.message,
        isAdmin: val.status.isAdmin,
        superAdmin: val.status.superAdmin
      })
      this.scrollToEnd()
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
      if (val.message) {
        this.sentMessage.push({
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
    '$route.params.community': async function (newVal, oldVal) {
      try {
        const exists = await CommunityService.index(this.$route.path)
        if (exists.data.error) {
          this.$router.push({
            name: 'Search'
          })
        } else {
          this.$socket.emit('leave', {
            c: oldVal
          })
          this.$socket.emit('join', newVal)
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
      } else {
        this.connect()
      }
    } catch (err) {
      console.log('error with request')
    }
  },
  beforeDestroy: function (val) {
    this.$socket.emit('leave', {
      c: this.$store.state.room
    })
  }
}

</script>

<style>
.chat_container {
  margin-top: 0 !important;
}
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