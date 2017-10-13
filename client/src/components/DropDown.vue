<template>
  <b-dropdown :text="user" variant="link">
    <b-dropdown-item v-if="this.$store.getters.admin" @click.stop="kick">
      kick
    </b-dropdown-item>
    <b-dropdown-item v-if="this.$store.getters.admin" @click.stop="ban">
      ban
    </b-dropdown-item>
  </b-dropdown>
</template>
<script>
  export default {
    props: ['user'],
    methods: {
      kick () {
        this.$socket.emit('kick', this.user)
      },
      ban () {
        this.$socket.emit('ban', this.user)
      }
    }
  }
</script>