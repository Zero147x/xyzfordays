<template>
  <v-layout>
    <v-flex xs6 md3 offset-xs4>
      <v-text-field
      v-model="username"
      label="username"
      single-line
      required
      full-width
      hide-details>
        
      </v-text-field>
      <v-text-field
      v-model="password"
      label="password"
      type="password"
      single-line
      required
      full-width
      hide-details>
        
      </v-text-field>
      <v-btn 
      primary 
      medium
      @click="login">
        Login
      </v-btn>
    </v-flex>
  </v-layout>
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
  methods: {
    async login () {
      const response = await AuthenticationService.login({
        username: this.username,
        password: this.password
      })
      this.$store.dispatch('setToken', response.data.token)
      this.$store.dispatch('setUser', response.data.user)
      this.$router.push({
        name: 'Chat'
      })
    }
  }
}
</script>

<style>

</style>