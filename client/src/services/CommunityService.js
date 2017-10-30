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
  search (search) {
    return api().get('/', {
      params: {
        search: search
      }
    })
  }
}
