const express = require('express')
const router = express.Router()

const returnRouter = (io) => {
  // const chatController = require('./controllers/chatController')(io)
  const authenticationPolicy = require('./policies/authenticationPolicy')
  const authenticationController = require('./controllers/authenticationController')
  
  // router.post('/chat', chatController.post)
  // router.post('/users', chatController.index)
  
  router.post('/register', authenticationPolicy.register,
  authenticationController.register)
  
  router.post('/login', authenticationController.login)
  
  
  return router
}

module.exports = returnRouter