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
  const githubController = require('./controllers/githubController')
  
  router.post('/api/register', authenticationPolicy.register,
    authenticationController.register)
  router.post('/api/login', authenticationController.login)
  router.post('/api/community', communityPolicy.name, communityController.create)
  router.get('/api/c/:community', communityController.index)
  router.post('/api/c/:community/edit', communityController.edit)
  router.get('/api', homePageController.index, searchController.index)
  router.get('/api/c/:community/edit', communityController.editIndex)
  router.post('/api/u/:username', accountController.profile)
  router.get('/api/u/:username', accountController.index)
  router.post('/api/auth/github', githubController.github)
  router.get('/api/auth/github', githubController.user)
  return router
}

module.exports = returnRouter
