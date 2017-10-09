// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import config from '@/config/config'

import Vue from 'vue'
import App from './App'
import router from './router'
import { sync } from 'vuex-router-sync'
import store from '@/store/store'
import Vuesocket from 'vue-socket.io'
import socketio from 'socket.io-client'


sync(store, router)

Vue.use(Vuesocket, socketio(`${config.url}`))
if (store.state.user) {
  this.$socket.on('connect', function () {
    this.$socket.emit('auth', store.state.user)
  })
}


Vue.use(BootstrapVue)

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
})