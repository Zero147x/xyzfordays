<template>
  <div>
    <b-col sm="12">
      <b-dropdown :class="{admin: user.status.isAdmin, user: !user.status.isAdmin}"
      :text="user.username" 
      variant="link">
        <b-dropdown-item v-if="this.$store.getters.admin" @click.stop="kick">
          kick
        </b-dropdown-item>
        <b-dropdown-item v-if="this.$store.getters.admin" @click.stop="ban">
          ban
        </b-dropdown-item>
      </b-dropdown>
    </b-col>
  </div>
</template>
<script>
  export default {
    props: ['user'],
    methods: {
      kick () {
        this.$socket.emit('kick', this.user.username)
      },
      ban () {
        this.$socket.emit('ban', this.user.username, this.$store.state.room)
      }
    }
  }
</script>