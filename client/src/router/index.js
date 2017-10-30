import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Community from '@/components/Community'
import Index from '@/components/Index'
import Search from '@/components/Search'
import Edit from '@/components/Edit'
import NotFound from '@/components/NotFound'
import Profile from '@/components/Profile'
import ManagmentIndex from '@/components/Account/ManagmentIndex'

Vue.use(Router)

export default new Router({
  routes: [
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
    },
    {
      path: '/',
      name: 'Search',
      component: Search
    },
    {
      path: '/notfound',
      name: 'NotFound',
      component: NotFound
    },
    {
      path: '/u/:username',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/u/:username/managment',
      name: 'ManagmentIndex',
      component: ManagmentIndex
    }
  ]
})

