<template>
  <v-layout>
    <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
      <v-card>
        <v-list three-line>
          <template v-for="item in result">
            <v-subheader v-if="item.header" v-text="item.header"></v-subheader>
            <v-divider></v-divider>
            <v-list-tile @click="" :to="{name: 'Index', params: {community: item.name}}">
              <v-list-tile-avatar>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.name"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
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
        console.log(value)
        const response = await CommunityService.search(value)
        console.log(response.data)
        this.result = response.data
      }
    }
  }
}
</script>

<style>

</style>