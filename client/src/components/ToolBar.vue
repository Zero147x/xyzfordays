<template>
  <v-toolbar fixed class="indigo darken-4" dark>
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    <v-toolbar-title>Toolbar</v-toolbar-title>
  </v-toolbar>
</template>

<script>
  export default {
    data () {
      return {
        drawer: this.drawer
      }
    },
    props: ['drawer']
  }
</script>