<template>
    <b-col sm="12" md="10" lg="9" xl="8" class="ml-auto mr-auto mt-5">
      <b-col sm="12">
        <b-breadcrumb :items="items"/>
      </b-col>
      <b-row>
        <b-col sm="10" md="8" xl="8" lg="9" class="m-auto">
          <b-alert v-if="error" show v-html="error" variant="danger" class="mb-0"></b-alert>
          <b-alert v-if="success" show v-html="success" variant="success" class="mb-0"></b-alert>
            <b-form-group
            class="text-left"
            label="Avatar:"
            description="This will show next to your name">
              <b-form-input
              v-model="src"
              placeholder="image url">
              </b-form-input>
            </b-form-group>
          <b-btn 
          @click.stop="save"
          variant="success">
            Save
          </b-btn>
        </b-col>
      </b-row>
    </b-col>
</template>
<script>
import AccountService from '../services/AccountService'

export default {
  data () {
    return {
      src: '',
      error: null,
      success: null,
      items: [{
      text: 'General',
      active: true,
      }, {
        text: 'Community Managment',
        to: {name: 'ManagmentIndex'},
      }]
    }
  },
  methods: {
    async save () {
      const response = await AccountService.profile({
        username: this.$store.state.user.username,
        src: this.src
      })
      if (response.data.error) {
        this.success = null
        this.error = response.data.error
      } else if (response.data.avatar) {
        this.error = null
        this.success = "Changes saved!"
        this.$store.dispatch('setUser', response.data)
        this.$socket.emit('auth', response.data)
      }
    }
  },
  async mounted () {
    const response = await AccountService.index({
      username: this.$route.params.username
    })
    if (response.data.error) {
      this.$router.push({
        name: 'NotFound'
      })
    }
  },
  watch: {
    '$route.params': async function (newVal, oldVal) {
      const response = await AccountService.index({
      username: newVal.username
      })
      if (response.data.error) {
        this.$router.push({
          name: 'NotFound'
        })
      }
    }
  }
}
</script>

<style>

</style>