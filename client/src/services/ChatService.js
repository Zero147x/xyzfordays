import api from './api'

export default {
  index () {
    return api().get('users')
  },
  sendMessage (message) {
    return api().post('chat', message)
  },
  user (user) {
    return api().post('users', user)
  }
}
