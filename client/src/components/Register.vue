<template>
  <b-row class="mt-5">
    
      <b-col sm="8" md=6 lg="5" xl="4" class="m-auto">
        <b-alert v-if="error" show variant="danger" v-html="error"></b-alert>
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
            @click="register">
              Register
            </b-btn>
          </b-col>
        </b-row>
        
        <b-col sm="6" class="ml-auto mr-auto mt-5">
          <button @click="authenticate('github')">
            Github
          </button>
        </b-col>
        
      </b-col>
      
  </b-row>
</template>
<script>
import AuthenticationService from '../services/AuthenticationService'
import Oauth from '../services/Oauth'
export default {
  data () {
    return {
      username: '',
      password: '',
      error: null
    }
  },
  sockets: {
    updateLocal: function (val) {
      this.$store.dispatch('socket_users', val.users)
    },
    updateRoom: function (val) {
      this.$store.dispatch('socket_room', val)
    }
  },
  methods: {
    async register () {
      const response = await AuthenticationService.register({
        username: this.username,
        password: this.password
      })
      if (response.data.user) {
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$socket.connect()
        this.$socket.emit('auth', this.$store.state.user)
        this.$router.push({
          name: 'Search'
        })
      } else if (response.data.error) {
        this.error = response.data.error        
      }
    },
    authenticate: async function (provider) {
      const response = await this.$auth.authenticate(provider).then(async (response) => {
        this.$store.dispatch('setToken', response.data.access_token)
        const r = await Oauth.github()
        
        this.$store.dispatch('setUser', r.data)
        this.$socket.connect()
        this.$socket.emit('auth', this.$store.state.user)
        this.$router.push({
          name: 'Search'
        })
      })
    }
  }
}
</script>

<style>

</style>