import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false,
    users: null,
    room: null
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      if (token) {
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = false
      }
    },
    setUser (state, user) {
      state.user = user
    },
    SOCKET_USERS (state, users) {
      state.users = users
    },
    SOCKET_ROOM (state, room) {
      state.room = room
    }
  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    },
    socket_users ({commit}, users) {
      commit('SOCKET_USERS', users)
    },
    socket_room ({commit}, room) {
      commit('SOCKET_ROOM', room)
    }
  }
})
