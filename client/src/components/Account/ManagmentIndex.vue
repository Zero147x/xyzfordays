<template>
    <b-col sm="12" md="10" lg="9" xl="8" class="ml-auto mr-auto mt-5">
      <b-col sm="12">
        <b-breadcrumb :items="items"/>
      </b-col>
        <b-col sm="10" md="8" xl="8" lg="9" class="mr-auto">
          <b-row>
            <b-col sm="3">
              <b-nav v-for="item in val"
              :key="val.name">
                <b-nav-item :disabled="active" @click="query(item)">{{item.name}}</b-nav-item>
              </b-nav>
            </b-col>
            <b-col>
              <edit v-if="community" :community="community"></edit>
            </b-col>
          </b-row>
        </b-col>
    </b-col>
</template>
<script>
import Edit from '../Edit'
import AccountService from '../../services/AccountService'
export default {
  components: {
    Edit
  },
  data () {
    return {
      active: false,
      community: null,
      val: null,
      items: [{
      text: 'General',
      to: {name: 'Profile'},
      }, {
        text: 'Community Managment',
        active: true
      }]
    }
  },
  methods: {
    query (val) {
      this.$router.push({
        name: 'ManagmentIndex',
        query: {
          community: val.name
        }
      })
      this.active = true
      this.community = val
    }
  },
  async mounted () {
    const response = await AccountService.managmentIndex(this.$route.path)
    if (response) {
      this.val = response.data
    }
  }
}
</script>

<style>

</style>