const db = require('../models')
const models = db.sequelize.models
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register (req, res) {
    try {
      const user = await models.User.create(req.body)
      res.send({
        token: jwtSignUser(user.toJSON()),
        user: user.toJSON()
      })
    } catch (err) {
      res.status(400).send({
        error: 'There was an error registering!'
      })
    }
  },
  
  async login (req, res, next) {
    try {
      const {username, password} = req.body
      const user = await models.User.findOne({
        where: {
          username: username,
        }
      })
      
      const isPasswordValid = user.comparePassword(password)
      if (isPasswordValid) {
        res.send({
        token: jwtSignUser(user.toJSON()),
        user: user.toJSON()
      })
      }
    } catch (err) {
      res.status(400).send({
        error: 'Invalid login information'
      })
    }
  }
}