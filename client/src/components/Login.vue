<template>
  <b-row class="mt-5">
    
      <b-col sm="8" md=6 lg="5" xl="4" class="m-auto">
        <b-alert v-if="error" show v-html="error" variant="danger"></b-alert>
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
        
        
        <h3 class="mt-2">Or sign in with one of the providers below:</h3>
        <a class="btn btn-block btn-social btn-github mt-5"
        @click="authenticate('github')">
          <span class="fa fa-github"></span>
          Sign in with github
        </a>
        
        <b-modal ref="modal">
          <div>
            <b-col sm="12">
              <h4>The username is already taken. Please select a new username to use</h4>
              <b-form-group class="mt-5">
                <b-form-input
                type="text"
                placeholder="Enter Username"
                v-model="username">
                  
                </b-form-input>
              </b-form-group>
              <b-btn
              variant="primary"
              @click.stop="newUsername">
                Submit
              </b-btn>
            </b-col>
          </div>
        </b-modal>
        
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
    async login () {
      const response = await AuthenticationService.login({
        username: this.username,
        password: this.password
      })
      if (response.data.user) {
        this.$store.dispatch('setUser', response.data.user)
        this.$store.dispatch('setToken', response.data.token)
        this.$socket.connect()
        this.$socket.emit('auth', response.data.user)
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
        if (r.data.error) {
          this.usernameTaken = r.data.error
          this.username = null
          this.$refs.modal.show()
          console.log(r)
        } else {
        
          this.$store.dispatch('setUser', r.data)
          this.$socket.connect()
          this.$socket.emit('auth', this.$store.state.user)
          this.$router.push({
            name: 'Search'
          })
        }
      })
    },
    newUsername: async function () {
      console.log(this.username)
      const response = await Oauth.newUsername({
        username: this.username
      })
      if (response.data.error) {
        this.modalError = response.data.error
      } else {
        this.$store.dispatch('setUser', response.data)
        this.$socket.connect()
        this.$socket.emit('auth', this.$store.state.user)
        this.$router.push({
          name: 'Search'
        })
      }
      console.log(response)
    }
  }
}

</script>

<style>
.btn-github {
  color: #fff !important;
  border-color: rgba(0,0,0,.2) !important;
}
.btn-github:hover {
  cursor: pointer;
}
</style>