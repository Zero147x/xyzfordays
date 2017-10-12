<template>
  <div id="app">
   
   <div>
    <b-navbar toggleable type="light" variant="light">
        <b-nav-toggle target="nav_text_collapse"></b-nav-toggle>
        <b-collapse is-nav id="nav_text_collapse">
            <b-nav is-nav-bar>
              <b-nav-item>
                <b-btn v-if="this.$store.state.isUserLoggedIn"
                :to="{name: 'Search'}"
                @click="Logout"
                variant="primary">
                  Logout
                </b-btn>
                <b-btn v-if="!this.$store.state.isUserLoggedIn"
                :to="{name: 'Register'}"
                variant="primary">
                  Register
                </b-btn>
                <b-btn v-if="!this.$store.state.isUserLoggedIn"
                :to="{name: 'Login'}"
                variant="primary">
                  Login
                </b-btn>
              </b-nav-item>
            </b-nav>
            <b-nav is-nav-bar>
              <b-btn :to="{name: 'Community'}">
                Start Your Own Community
              </b-btn>
            </b-nav>
            <b-nav is-nav-bar class="ml-auto">
              <b-row>
                    <b-form>
                      <b-form-group class="search_field">
                        <b-form-input @keyup.enter.native="send"
                        type="text"
                        placeholder="Search..."
                        v-model="search">
                        </b-form-input>
                      </b-form-group>
                    </b-form>
                  <b-btn variant="primary" class="search_btn"
                  @click.stop="Search">
                  Search
                  </b-btn>
                </b-row>
            </b-nav>
        </b-collapse>
    </b-navbar>
</div>
   

      <main>
        
          <b-container fluid>
            
            <router-view></router-view>
            
          </b-container>
          
      </main>
    
    </nav>
  </div>
</template>

<script>
export default {
  data () {
    return {
      search: ''
    }
  },
  sockets: {
    updateRoom: function (val) {
      this.$store.dispatch('socket_room', val)
    },
    updateLocal: function (data) {
      this.$store.dispatch('socket_users', data.users)
    }
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
    },
    Logout: function () {
      this.$socket.emit('logout') // temporaray comment out
      this.$store.dispatch('setUser', null)
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('socket_room', null)
      this.$store.dispatch('socket_users', null)
      this.$router.push({
        name: 'Search'
      })
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
  margin-left: 200px
}
.admin {
  color: #0ae20a
}
.superAdmin {
  color:red
}
.search_btn {
  height:37px
}
.search_field {
  margin-bottom:0
}
</style>
