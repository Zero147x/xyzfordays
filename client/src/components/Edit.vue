<template>
    <b-col sm="12">
      <b-col sm="12">
        <b-alert v-if="success" show class="success" variant="success">
          Changes saved!
        </b-alert>
        <b-form-group class="text-left"
        label="Greeting Message:"
        description="Users will see this when they connect">
          <b-form-textarea
          v-model="community.greeting"
          rows="6">
          </b-form-textarea>
        </b-form-group>
        <b-col class="save m-auto" sm="4">
          <b-btn
          @click.stop="save"
          variant="success">
            Save
          </b-btn>
        </b-col>
      </b-col>
    </b-col>
</template>
<script>
import AccountService from '../services/AccountService'

export default {
  props: ['community'],
  data () {
    return {
      success: false,
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
    async save () {
      const response = await AccountService.managment({
        greeting: this.community.greeting,
        c: this.$route.query.community,
        path: this.$route.path
      })
      if (response) {
        this.success = true
      }
    }
  },
  watch: {
    'community.greeting': function (val) {
      console.log(val)
    }
  }
}
</script>

<style>
.save {
  width: 78px;
  padding-left: 0;
}
.notActive > a:hover {
  color: black !important;
  border-color: #e9ecef #e9ecef #ddd !important
}

.notActive > a {
  color: blue !important;
  border: 1px solid transparent !important;
  border-top-left-radius: 0.25rem !important;
  border-top-right-radius: 0.25rem !important;
}
</style>