import api from './api'

export default {
  sendMessage () {
    return api().post('https://project-zero147x.c9users.io/chat')
  }
}