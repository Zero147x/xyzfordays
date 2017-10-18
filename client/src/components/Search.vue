<template>
  <b-row class="mt-5">
    <b-col class="m-auto" sm="12" md="8" lg="6" xl="5">
      <h3>Below are a list of communities that have been created so far, sorted by most recently created</h3>
      <b-pagination-nav 
        v-if="result"
        align="center" 
        limit=8 
        :link-gen="linkGen" 
        :number-of-pages="20" 
        v-model="currentPage" />
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
      currentPage: 1,
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
  methods: {
    linkGen(pageNum) {
      return '#/?count=' + pageNum + 0;
    }
  },
  watch: {
    '$route.query.count': {
      immediate: true,
      async handler (value) {
        const response = await CommunityService.count(value)
        console.log(response.data)
        this.result = response.data
      }
    },
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
    console.log(response.data)
    this.result = response.data
  }
}
</script>

<style>

</style>