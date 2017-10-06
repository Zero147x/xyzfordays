<template>
  <b-row>
      <b-col sm="5" class="m-auto">
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
      name: ''
    }
  },
  methods: {
    async create () {
      try {
        const response = await CommunityService.create({
          name: this.name,
          user: this.$store.state.user
        })
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
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style>

</style>
