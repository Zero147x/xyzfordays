<template>
  <b-row>
      <b-col sm="5" class="m-auto">
        <b-col sm="12">
          <b-alert v-if="error" show v-html="error" variant="danger"></b-alert>
        </b-col>
        <b-form-group>
          <b-form-input
          v-model="name"
          placeholder="Enter Community Name">
          </b-form-input>
        </b-form-group>
        <b-btn
        @click="create"
        variant="primary">
          Create
        </b-btn>
      </b-col>
  </b-row>
</template>
<script>
import CommunityService from '../services/CommunityService'

export default {
  data () {
    return {
      name: '',
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
    async create () {
      try {
        const response = await CommunityService.create({
          name: this.name,
          user: this.$store.state.user
        })
        console.log(response)
        if (response.data.name) {
          this.$router.push({
            name: 'Index',
            params: {
              community: response.data.name
            }
          })
          this.$socket.emit('join', {
            user: this.$store.state.user,
            name: '/c/' + response.data.name
          })
        }
        if (response.data.error) {
          this.error = response.data.error
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style>
</style>
