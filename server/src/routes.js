const express = require('express')
const router = express.Router()

const returnRouter = (io) => {
  const authenticationPolicy = require('./policies/authenticationPolicy')
  const authenticationController = require('./controllers/authenticationController')
  const communityController = require ('./controllers/communityController')
  const searchController = require ('./controllers/searchController')
  
  router.post('/register', authenticationPolicy.register,
  authenticationController.register)
  
  router.post('/login', authenticationController.login)
  
  router.post('/community', communityController.create)
  router.get('/c/:community', communityController.index)
  router.get('/', searchController.index)
  
  return router
}

module.exports = returnRouter