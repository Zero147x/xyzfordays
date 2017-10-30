const db = require('../models')
const models = db.sequelize.models

module.exports = {
  async index (req, res) {
    try {
      const response = await models.Community.findAll({
        limit: 10,
        where: {
          UserId: req.session.user.id,
        }
      })
      if (response) {
        res.send(response)
      } else {
        res.send({
          error: 'You do not have permission'
        })
      }
    } catch (err) {
      res.status(400).send({
        error: 'Error with your request'
      })
    }
  },

  async update (req, res) {
    try {
      const response = await models.Community.findOne({
        where: {
          UserId: req.session.user.id,
          name: req.query.community
        }
      })
      if (response) {
        await response.update({
          greeting: req.body.greeting
        })
      } else {
        res.status(403).send({
          error: 'You do not have permission to do that!'
        })
      }
      res.send(response)
    } catch (err) {
      res.status(500).send({
        error: 'Error processing your request'
      })
    }
  }
}