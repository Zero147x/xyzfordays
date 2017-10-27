import api from './api'
import store from '@/store/store'
import config from '@/config/config'

export default {
  github () {
    return api().get('auth/github')
  },
  newUsername (val) {
    console.log(val)
    return api().get('auth/github', {
      params: {
        username: val.username
      }
    })
  }
}