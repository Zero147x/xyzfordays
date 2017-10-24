<template>
  <div class="mt-5">
    <b-col sm="8" md=6 lg="5" xl="4" class="m-auto">
      <b-alert v-if="error" show v-html="error" variant="danger" class="mb-0"></b-alert>
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
  </div>
</template>
<script>
import AccountService from '../services/AccountService'

export default {
  data () {
    return {
      src: '',
      error: null
    }
  },
  methods: {
    async save () {
      const response = await AccountService.profile({
        username: this.$store.state.user.username,
        src: this.src
      })
      if (response.data.error) {
        this.error = response.data.error
      }
    }
  }
}
</script>

<style>

</style>