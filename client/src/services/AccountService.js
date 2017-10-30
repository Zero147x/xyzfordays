import api from './api'

export default {
  index (val) {
    return api().get(`u/${val.username}`, val)
  },
  profile (val) {
    return api().post(`u/${val.username}`, val)
  },
  managmentIndex (val) {
    return api().get(`${val}`)
  },
  managment (val) {
    return api().post(`${val.path}`, val, {
      params: {
        community: val.c
      }
    })
  }
}