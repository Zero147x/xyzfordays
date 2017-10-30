<template>
    <b-col sm="12">
      <b-col sm="12">
        <b-alert v-if="success" show class="success" variant="success">
          Changes saved!
        </b-alert>
        <b-form-textarea
        v-model="greeting"
        placeholder="Greeting Message (Users will see this when they connect)"
        rows="6"
        >
        </b-form-textarea>
        <b-col class="save" sm="4">
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
      greeting: '',
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
        greeting: this.greeting,
        c: this.$route.query.community,
        path: this.$route.path
      })
      if (response) {
        this.success = true
      }
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