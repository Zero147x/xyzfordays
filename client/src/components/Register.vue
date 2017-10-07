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
            @click="register">
              Register
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