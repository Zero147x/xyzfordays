<template>
  <div class="text-xs-left">
    <b-col sm="12">
      <b-media>
        <b-img class="mr-0" slot="aside" blank blank-color="#ccc" width="38" alt="placeholder" />
      <b-dropdown
      :class="{admin: user.status.isAdmin, user: !user.status.isAdmin}"
        :text="user.username" 
        variant="link">
        <b-dropdown-item v-if="this.$store.getters.admin && !user.status.isAdmin" @click.stop="kick">
          kick
        </b-dropdown-item>
        <b-dropdown-item v-if="this.$store.getters.admin && !user.status.isAdmin" @click.stop="ban">
          ban
        </b-dropdown-item>
      </b-dropdown>
      </b-media>
    </b-col>
  </div>
</template>
<script>
  export default {
    props: ['user'],
    methods: {
      kick () {
        this.$socket.emit('kick', this.user.username, this.$store.state.room)
      },
      ban () {
        this.$socket.emit('ban', this.user.username, this.$store.state.room)
      }
    }
  }
</script>
<style>
  .media > div {
    margin-right: 0 !important;
  }
</style>