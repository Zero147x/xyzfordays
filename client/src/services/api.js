import axios from 'axios'
import store from '@/store/store'

export default () => {
  return axios.create({
    baseURL: 'https://project-zero147x.c9users.io:8081',
    headers: {
      Authorization: `Bearer ${store.state.token}`
    }
  })
}
