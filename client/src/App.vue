<template>
<b-row no-gutters>
<b-col>
  <div id="app">
   
   <div>
    <b-navbar class="pr-0 pl-0" toggleable type="light" variant="light">
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
                <b-dropdown text="Navigation">
                  <b-dropdown-item v-if="this.$store.state.user"
                  :to="{name: 'Profile', params: {username: this.$store.state.user.username}}">
                    View Profile
                  </b-dropdown-item>
                  <b-dropdown-item :to="{name: 'Community'}">
                    Start Your Own Community
                  </b-dropdown-item>
                </b-dropdown>
                <b-btn :to="{name: 'Search'}"
                variant="primary">
                  Home
                </b-btn>
              </b-nav-item>
              <b-nav-form>
                <b-form-input class="search_field" 
                @keyup.enter.native="Search"
                type="text"
                placeholder="Search..."
                v-model="search">
                </b-form-input>
              </b-nav-form>
            </b-nav>
        </b-collapse>
    </b-navbar>
  </div>

      <main>
        
          <b-container fluid class="pl-0 pr-0">
            
            <router-view></router-view>
            
          </b-container>
          
      </main>
  </div>
  </b-col>
  <b-col 
  v-if="this.$store.state.users"
  cols="3" xl="2" class="d-none d-md-block users_list">
    <b-card class="users_card">
      <drop-down
      v-for="user in this.$store.state.users"
      :key="user.username"
      :user="user"/>
    </b-card>
  </b-col>
</b-row>
</template>

<script>
import _ from 'lodash'
import DropDown from './components/DropDown'

export default {
  components: {
    DropDown
  },
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
      this.$socket.emit('logout')
      this.$store.dispatch('socket_room', null)
      this.$store.dispatch('socket_users', null)
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'Login'
      })
    }
  },
  watch: {
    search: _.debounce(function (val) {
      const route = {
        name: 'Search'
      }
      if (this.search !== '') {
        route.query = {
          search: this.search
        }
      }
      this.$router.push(route)
    }, 500 )
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
.chat_container {
  margin-left: 200px;
}
@media screen and (max-width: 1100px) {
  .chat_container {
    margin-left: 0;
  }
}

#app {
  font-family: 'Titillium Web', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.list__tile--active {
  color:hsla(0,0%,100%,.3)
}
.admin {
  color: #0ae20a
}
.admin > button,
.admin > button:hover { 
  color: #0ae20a;
  text-decoration: none;
  cursor: pointer;
}
.admin > button:focus {
  color: #0ae20a;
  text-decoration: none;
}
.user > button {
color: black;
}
.user > button:hover {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
.user > button:focus {
  color: black;
  text-decoration: none;
}
.superAdmin {
  color:red
}
.search_field {
  width: 32vw !important;
}
</style>
