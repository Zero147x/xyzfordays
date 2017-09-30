<template>
  <div id="app">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </head>
      
      <v-app dark id="example2" toolbar>
      
      <!--  TO DO:
            Figure out how to put the drawer and toolbar into
            a component together, or seperate components, without 
            sacrificing speed ( There is a delay when passing data between components)
      -->
      
      <v-navigation-drawer dark temporary absolute light v-model="drawer" overflow>
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list class="pt-0" dense>
        <v-divider light></v-divider>
        <v-list-tile :to="{name: 'Community'}">
          <v-list-tile-action>
            <v-icon></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Start Your Own Community</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    
    <v-toolbar fixed dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Menu</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-flex xs3>
        <v-text-field class="mt-4"
        @keyup.enter="Search"
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        full-width>
        </v-text-field>
      </v-flex>
      <v-btn
      :to="{name: 'Login'}"
      primary>
        Login
      </v-btn>
      <v-btn
      :to="{name: 'Register'}"
      primary>
        Register
      </v-btn>
      
    </v-toolbar>
    
  <!--  <side-menu :drawer="drawer" />-->
  <!--    <v-toolbar fixed class="indigo darken-4" dark>-->
  <!--  <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>-->
  <!--  <v-toolbar-title>Toolbar</v-toolbar-title>-->
  <!--</v-toolbar>-->
      
      <main>
        
        <v-container fluid>
          
          <router-view></router-view>
          
        </v-container>
      </main>
    </v-app>
  </div>
</template>

<script>
// import CommunitySearch from './components/CommunitySearch'
import SideMenu from './components/SideMenu'
export default {
  data () {
    return {
      drawer: true,
      search: ''
    }
  },
  sockets: {
    updateRoom: function (data) {
      this.$store.dispatch('socket_room', data.room)
    },
    updateLocal: function (data) {
      this.$store.dispatch('socket_users', data.users)
    }
  },
  components: {
    SideMenu
  },
  methods: {
    Search: function () {
      const route = {
        name: 'Search'
      }
      if (this.search !== '') {
        route.query = {
          search: this.search
        }
      }
      this.$router.push(route)
    }
  },
  watch: {
    '$route': function () {
      if (this.$store.state.room !== null) {
        if (this.$route.name !== 'Index') {
          try {
            this.$socket.emit('leave', {
              username: this.$store.state.user.username,
              name: this.$store.state.room
            })
          } catch (err) {
            console.log('error with request')
          }
        }
      }
    }
  },
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.list__tile--active {
  color:hsla(0,0%,100%,.3)
}
.search {
  margin-left: 200px;
}
</style>
