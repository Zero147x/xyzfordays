import api from './api'

export default {
  sendMessage (message) {
    return api().post('chat', message)
  },
  user (user) {
    return api().post('users', user)
  }
}
