// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vuetify from 'vuetify'
import VueSocketIO from 'vue-socket.io'

Vue.use(VueSocketIO, 'https://project-zero147x.c9users.io:8081')

Vue.config.productionTip = false

Vue.use(vuetify)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
