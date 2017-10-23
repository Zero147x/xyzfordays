<template>
  <div class="mt-5">
    <b-col sm="8" md=6 lg="5" xl="4" class="m-auto">
        <b-form-group>
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
      src: ''
    }
  },
  methods: {
    async save () {
      const response = await AccountService.profile({
        username: this.$store.state.user.username,
        src: this.src
      })
    }
  }
}
</script>

<style>

</style>