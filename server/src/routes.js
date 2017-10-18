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
  
  router.post('/register', authenticationPolicy.register,
    authenticationController.register)
  router.post('/login', authenticationController.login)
  router.post('/community', communityPolicy.name, communityController.create)
  router.get('/c/:community', isAuthenticated, communityController.index)
  router.post('/c/:community/edit', isAuthenticated, communityController.edit)
  router.get('/', homePageController.index, searchController.index, searchController.home)
  router.get('/home', searchController.home)
  router.get('/c/:community/edit', isAuthenticated, communityController.editIndex)
  return router
}

module.exports = returnRouter
