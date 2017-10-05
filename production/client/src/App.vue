<template>
  <div id="app">
      
      <!--<v-app dark id="example2" toolbar>-->
      
      <!--  TO DO:
            Figure out how to put the drawer and toolbar into
            a component together, or seperate components, without 
            sacrificing speed ( There is a delay when passing data between components)
      -->
      
    <!--  <v-navigation-drawer dark persistent absolute clipped light overflow v-model="drawer">-->
    <!--  <v-toolbar flat class="transparent">-->
    <!--    <v-list class="pa-0">-->
    <!--      <v-list-tile avatar>-->
    <!--        <v-list-tile-avatar>-->
    <!--        </v-list-tile-avatar>-->
    <!--        <v-list-tile-content>-->
    <!--          <v-list-tile-title></v-list-tile-title>-->
    <!--        </v-list-tile-content>-->
    <!--      </v-list-tile>-->
    <!--    </v-list>-->
    <!--  </v-toolbar>-->
    <!--  <v-list class="pt-0" dense>-->
    <!--    <v-divider light></v-divider>-->
    <!--    <v-list-tile :to="{name: 'Community'}">-->
    <!--      <v-list-tile-action>-->
    <!--        <v-icon></v-icon>-->
    <!--      </v-list-tile-action>-->
    <!--      <v-list-tile-content>-->
    <!--        <v-list-tile-title>Start Your Own Community</v-list-tile-title>-->
    <!--      </v-list-tile-content>-->
    <!--    </v-list-tile>-->
    <!--  </v-list>-->
    <!--</v-navigation-drawer>-->
    
    <!--<v-toolbar fixed dark>-->
    <!--  <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>-->
    <!--  <v-toolbar-title>Menu</v-toolbar-title>-->
    <!--  <v-spacer></v-spacer>-->
    <!--  <v-flex xs3>-->
    <!--    <v-text-field class="mt-4"-->
    <!--    @keyup.enter="Search"-->
    <!--    v-model="search"-->
    <!--    append-icon="search"-->
    <!--    label="Search"-->
    <!--    single-line-->
    <!--    full-width>-->
    <!--    </v-text-field>-->
    <!--  </v-flex>-->
    <!--  <v-btn-->
    <!--  :to="{name: 'Login'}"-->
    <!--  primary>-->
    <!--    Login-->
    <!--  </v-btn>-->
    <!--  <v-btn-->
    <!--  :to="{name: 'Register'}"-->
    <!--  primary>-->
    <!--    Register-->
    <!--  </v-btn>-->
      
    <!--</v-toolbar>-->
   
   <div>
    <b-navbar toggleable type="light" variant="light">
        <b-nav-toggle target="nav_text_collapse"></b-nav-toggle>
        <b-collapse is-nav id="nav_text_collapse">
            <b-nav is-nav-bar>
                <b-nav-item>
                  <b-btn
                  :to="{name: 'Register'}"
                  variant="primary">
                    Register
                  </b-btn>
                  <b-btn
                  :to="{name: 'Login'}"
                  variant="primary">
                    Login
                  </b-btn>
                </b-nav-item>
            </b-nav>
            <b-nav is-nav-bar class="ml-auto">
              <b-col sm="8">
                <b-form-input @keyup.enter.native="send"
                  v-model="search"
                  type="text"
                  placeholder="Search..."
                  >
                </b-form-input>
              </b-col>
              <b-col>
                <b-btn variant="primary"
                @click.stop="Search">
                Search
                </b-btn>
              </b-col>
                
            </b-nav>
        </b-collapse>
    </b-navbar>
</div>
   
   
      <main>
        
        <!--<v-container>-->
          <b-container fluid>
            
            <router-view></router-view>
            
          </b-container>
          
        <!--</v-container>-->
      </main>
    <!--</v-app>-->
    
    </nav>
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
html,body
{
  overflow-x: hidden;
  overflow-y: auto
}
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
