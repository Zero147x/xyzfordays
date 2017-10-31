<template>
  <b-row class="chat_container">
    <chat></chat>
      
    <b-col cols="3" xl="2" class="d-none d-md-block ml-auto">
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
import Chat from './Chat'

export default {
  components: {
    DropDown,
    Chat
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
    updateUsers: function (val) {
      this.$store.dispatch('socket_users', val)
    },
    updateLocal: function (val) {
      this.$store.dispatch('socket_users', val.users)
    },
    updateRoom: function (val) {
      this.$store.dispatch('socket_room', val)
    }
  },
  methods: {
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
.users_card > div {
  padding: 0;
}
.users_card {
  height: 100%;
  overflow-y: auto;
  text-align: left !important;
}
</style>