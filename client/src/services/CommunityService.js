import api from './api'

export default {
  create (community) {
    return api().post('community', community)
  },
  index (community) {
    return api().get(`${community}`, community)
  },
  edit (val) {
    return api().post(val.path, {
      greeting: val.greeting
    })
  },
  search (search) {
    return api().get('/', {
      params: {
        search: search
      }
    })
  }
}
