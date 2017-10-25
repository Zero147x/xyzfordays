import api from './api'

export default {
  index (val) {
    return api().get(`u/${val.username}`, val)
  },
  profile (val) {
    return api().post(`u/${val.username}`, val)
  }
}