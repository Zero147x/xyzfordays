import api from './api'

export default {
  profile (val) {
    return api().post(`u/${val.username}`, val)
  }
}