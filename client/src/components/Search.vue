<template>
  <b-row>
    <b-col sm="6" class="m-auto">
      <b-list-group>
        <b-list-group-item
        v-for="(key, value, index) in result"
        :key="index"
        :to="{name: 'Index', params: {community: key.name}}"
        >
          <b-row>
            <b-col>
              {{key.name}}
            </b-col>
          </b-row>
        </b-list-group-item>
      </b-list-group>
    </b-col>
  </b-row>
</template>
<script>
import CommunityService from '../services/CommunityService'
export default {
  data () {
    return {
      userCount: null,
      result: null
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
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        const response = await CommunityService.search(value)
        this.result = response.data
      }
    }
  },
  async mounted () {
    const response = await CommunityService.home()
    this.result = response.data
    console.log(this.result)
    console.log(this.$socket)
    this.$socket.emit('test')
  }
}
</script>

<style>

</style>