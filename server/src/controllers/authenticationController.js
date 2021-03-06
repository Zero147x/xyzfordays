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
      req.session.user = user.toJSON()
      res.send({
        token: jwtSignUser(user.toJSON()),
        user: user.toJSON()
      })
    } catch (err) {
      res.send({
        error: 'Username already taken'
      })
    }
  },

  async login (req, res, next) {
    try {
      const {username, password} = req.body
      const user = await models.User.findOne({
        where: {
          username: username
        }
      })
      if (user.password === null) {
        res.send({
          error: 'Invalid login information'
        })
      } else if (user.password) {
        const isPasswordValid = await user.comparePassword(password)
        if (isPasswordValid) {
          req.session.user = user.toJSON()
          res.send({
            token: jwtSignUser(user.toJSON()),
            user: user.toJSON()
          })
        } else {
          res.send({
            error: 'Invalid login information'
          })
        }
      }
    } catch (err) {
      res.send({
        error: 'Invalid login information'
      })
    }
  }
}
