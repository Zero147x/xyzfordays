<template>
  <b-dropdown :text="user" variant="link">
    <b-dropdown-item v-if="this.$store.getters.admin">
      kick
    </b-dropdown-item>
    <b-dropdown-item v-if="this.$store.getters.admin">
      ban
    </b-dropdown-item>
  </b-dropdown>
</template>
<script>
  export default {
    props: ['user'],
  }
</script>