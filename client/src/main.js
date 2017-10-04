// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Vue from 'vue'
import App from './App'
import router from './router'
import { sync } from 'vuex-router-sync'
import vuetify from 'vuetify'
// import VueSocketIO from 'vue-socket.io'
import store from '@/store/store'
sync(store, router)

Vue.use(BootstrapVue)
// Vue.use(VueSocketIO, `https://project-zero147x.c9users.io:8081?autho_token=${store.state.token}`, store, {
//   reconnection: true,
//   reconnectionDelay: 1000,
//   reconnectionDelayMax: 5000,
//   reconnectionAttempts: 99999
// })

Vue.config.productionTip = false

Vue.use(vuetify)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
