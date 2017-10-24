const express = require('express')
const router = express.Router()

const returnRouter = (io) => {
  const authenticationPolicy = require('./policies/authenticationPolicy')
  const authenticationController = require('./controllers/authenticationController')
  const communityController = require('./controllers/communityController')
  const searchController = require('./controllers/searchController')
  const isAuthenticated = require('./policies/isAuthenticated')
  const homePageController = require('./controllers/homePageController')
  const communityPolicy = require('./policies/communityPolicy')
  const accountController = require('./controllers/accountController')
  
  router.post('/api/register', authenticationPolicy.register,
    authenticationController.register)
  router.post('/api/login', authenticationController.login)
  router.post('/api/community', communityPolicy.name, communityController.create)
  router.get('/api/c/:community', isAuthenticated, communityController.index)
  router.post('/api/c/:community/edit', isAuthenticated, communityController.edit)
  router.get('/api', homePageController.index, searchController.index)
  router.get('/api/c/:community/edit', isAuthenticated, communityController.editIndex)
  router.post('/api/user/:username/profile', isAuthenticated, accountController.index)
  return router
}

module.exports = returnRouter
