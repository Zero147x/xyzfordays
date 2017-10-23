import api from './api'

export default {
  profile (val) {
    return api().post(`user/${val.username}/profile`, val)
  }
}