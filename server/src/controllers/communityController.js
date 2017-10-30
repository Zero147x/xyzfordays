const db = require('../models')
const models = db.sequelize.models

module.exports = {

  async index (req, res) {
    try {
      const exists = await models.Community.findOne({
        where: {
          name: req.params.community
        }
      })
      if (exists) {
        res.send(exists.toJSON())
      } else {
        res.send({
          error: 'Community does not exist!'
        })
      }
    } catch (err) {
      res.status(400).send({
        error: 'That community does not exists!'
      })
    }
  },

  async create (req, res) {
    try {
      const exists = await models.Community.findOne({
        where: {
          name: req.body.name
        }
      })
      const exists2 = await models.Community.findOne({
        where: {
          UserId: req.body.user.id
        }
      })
      if (exists) {
        res.send({
          error: 'Community with that name already exists!'
        })
      } else if (exists2) {
        res.send({
          error: 'Can only create 1 community per account at the moment'
        })
      } else {
        const newCommunity = await models.Community.create({
          name: req.body.name,
          UserId: req.body.user.id
        })
        res.send(newCommunity)
      }
    } catch (err) {
      res.status(400).send({
        error: 'You must be logged in to do that'
      })
    }
  }
}
