import Vue from 'vue'
import Router from 'vue-router'
import Chat from '@/components/Chat'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Community from '@/components/Community'
import Index from '@/components/Index'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Hello',
    //   component: Hello
    // },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/community',
      name: 'Community',
      component: Community
    },
    {
      path: '/c/:community',
      name: 'Index',
      component: Index
    }
  ]
})
