import api from './api'

export default {
  create (community) {
    return api().post('community', community)
  },
  index (community) {
    return api().get(`${community}`, community)
  },
  count (val) {
    return api().get('/', {
      params: {
        count: val,
      }
    })
  },
  edit (val) {
    return api().post(`/c/${val.c}/edit`, {
      greeting: val.greeting
    })
  },
  editIndex (val) {
    return api().get(`/c/${val.community}/edit`, val)
  },
  home () {
    return api().get('/home')
  },
  search (search) {
    return api().get('/', {
      params: {
        search: search
      }
    })
  }
}
