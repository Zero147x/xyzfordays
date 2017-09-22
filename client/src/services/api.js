import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'https://project-zero147x.c9users.io:8081'
  })
}