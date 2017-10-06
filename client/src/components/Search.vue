<template>
  <b-row>
    <b-col sm="6" class="m-auto">
      <b-list-group>
        <b-list-group-item
        v-for="item in result"
        v-bind:data="item"
        v-bind:key="item.name"
        :to="{name: 'Index', params: {community: item.name}}"
        >
          {{item.name}}
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
      result: ''
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
    console.log(response.data)
    this.result = response.data
  }
}
</script>

<style>

</style>