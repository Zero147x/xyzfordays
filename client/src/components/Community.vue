<template>
  <v-layout>
    <v-flex xs12 sm10 md8 offset-sm1 offset-md2 >
      <v-card height="200px">
        <v-text-field
        v-model="name"
        label="Enter Community Name"
        single-line
        full-width
        hide-details>
          
        </v-text-field>
        
        <v-btn 
        primary
        @click="create">
          Create
        </v-btn>
      </v-card>
    </v-flex>
  </v-layout>
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
          user: this.$store.state.user.username,
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
