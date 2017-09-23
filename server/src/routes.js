const express = require('express')
const router = express.Router()

const returnRouter = (io) => {
  const authenticationController = require('./controllers/chatController')(io)
  
  router.post('/chat', authenticationController.chat)

  return router
}

module.exports = returnRouter