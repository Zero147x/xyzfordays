import api from './api'

export default {
  create (community) {
    return api().post('community', community)
  }
}
