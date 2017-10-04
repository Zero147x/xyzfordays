const express = require('express')
const router = express.Router()

const returnRouter = (io) => {
  const authenticationPolicy = require('./policies/authenticationPolicy')
  const authenticationController = require('./controllers/authenticationController')
  const communityController = require ('./controllers/communityController')
  const searchController = require ('./controllers/searchController')
  const isAuthenticated = require('./policies/isAuthenticated')
  
  router.post('/register', authenticationPolicy.register,
  authenticationController.register)
  
  router.post('/login', authenticationController.login)
  
  router.post('/community', communityController.create)
  router.get('/c/:community', isAuthenticated, communityController.index)
  // router.get('/c/:community/edit', isAuthenticated, communityEditController.index)
  router.get('/', searchController.index)
  
  return router
}

module.exports = returnRouter