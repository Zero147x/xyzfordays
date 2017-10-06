<template>
  <b-row>
    
    <b-row>
      <b-col sm="6">
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
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="6">
        <b-btn variant="primary"
        @click="register">
          Login
        </b-btn>
      </b-col>
    </b-row>
    
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
  methods: {
    async register () {
      await AuthenticationService.register({
        username: this.username,
        password: this.password
      })
    }
  }
}
</script>

<style>

</style>