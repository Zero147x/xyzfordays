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

Vue.use(Vuesocket, socketio(`https://project-zero147x.c9users.io:8081`), store, {
  secure: true,
  reconnect: true,
})

if (typeof this.$socket !== 'undefined') {
  this.$socket.on('connect', function () {
    if (store.state.user) {
      this.$socket.emit('auth', store.state.user)
    }
  })
}

Vue.use(BootstrapVue)

Vue.config.productionTip = false



Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    el.event = function (event) {
      // here I check that click was outside the el and his childrens
      if (!(el == event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', el.event)
  },
  unbind: function (el) {
    document.body.removeEventListener('click', el.event)
  },
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
