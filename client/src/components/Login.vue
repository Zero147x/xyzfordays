<template>
  <b-row>
    
      <b-col sm="3" class="m-auto">
        <b-form>
          <b-form-group>
            <b-form-input
            type="text"
            placeholder="username"
            v-model="username">
            </b-form-input>
            <b-form-input
            type="password"
            placeholder="password"
            v-model="password">
            </b-form-input>
          </b-form-group>
        </b-form>
        <b-row>
          <b-col sm="12">
            <b-btn variant="primary"
            @click="login">
              Login
            </b-btn>
          </b-col>
        </b-row>
      </b-col>
    
  </b-row>
</template>
<script>
import AuthenticationService from '../services/AuthenticationService'

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  sockets: {
    updateLocal: function (val) {
      this.$store.dispatch('socket_users', val.users)
    },
    updateRoom: function (val) {
      this.$store.dispatch('socket_room', val)
    },
    disconnect: function () {
      this.$socket.reconnect()
    },
    connect: function () {
      console.log('connected!!!!')
    }
  },
  methods: {
    async login () {
      const response = await AuthenticationService.login({
        username: this.username,
        password: this.password
      })
      this.$store.dispatch('setUser', response.data.user)
      this.$store.dispatch('setToken', response.data.token)
      if (response) {
        this.$socket.connect()
        this.$socket.emit('auth', this.$store.state.user)
        this.$router.push({
          name: 'Search'
        })
      }
    }
  },
  computed: {
    token () {
      return this.$store.getters.myToken
    }
  }
}

</script>

<style>

</style>