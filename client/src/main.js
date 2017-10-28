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
import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'
import axios from 'axios';
axios.defaults.withCredentials = true
const randomstring = require("randomstring");
sync(store, router)

Vue.use(Vuesocket, socketio(`https://project-zero147x.c9users.io:8081`), store, {
  secure: true,
  reconnect: true,
})

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
Vue.use(VueAxios, axios)
Vue.use(VueAuthenticate, {
  baseUrl: config.url, // Your API domain
  
  providers: {
    github: {
      clientId: '84bae1544802ef7ee01c',
      redirectUri: 'https://project-zero147x.c9users.io/#/register', // Your client app URL
    }
  }
})

Vue.use(VueAuthenticate, {
  bindRequestInterceptor: function () {
    this.$http.interceptors.request.use((config) => {
      if (this.isAuthenticated()) {
        config.headers['Authorization'] = [
          this.options.tokenType, this.getToken()
        ].join(' ')
      } else {
        delete config.headers['Authorization']
      }
      return config
    })
  },

  bindResponseInterceptor: function () {
    this.$http.interceptors.response.use((response) => {
      this.setToken(response)
      return response
    })
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
