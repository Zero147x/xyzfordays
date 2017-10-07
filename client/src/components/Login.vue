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
import config from '@/config/config'
import AuthenticationService from '../services/AuthenticationService'
import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
import store from '@/store/store'

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async login () {
      const response = await AuthenticationService.login({
        username: this.username,
        password: this.password
      })
      this.$store.dispatch('setToken', response.data.token)
      this.$store.dispatch('setUser', response.data.user)

      Vue.use(VueSocketIO, `${config.url}?auth_token=${this.$store.state.token}`, store), //{
        // reconnection: true,
        // reconnectionDelay: 1000,
        // reconnectionDelayMax: 5000,
        // reconnectionAttempts: 99999
      // })
      this.$router.push({
        name: 'Search'
      })
    }
  }
}
</script>

<style>

</style>