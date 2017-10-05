import axios from 'axios'
import store from '@/store/store'
import config from '@/config/config'

export default () => {
  return axios.create({
    baseURL: `${config.url}`,
    headers: {
      Authorization: `Bearer ${store.state.token}`
    }
  })
}
