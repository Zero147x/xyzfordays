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
      if (exists) {
        res.status(400).send({
          error: 'Community with that name already exists!'
        })
      }
      
      const newCommunity = await models.Community.create({
        name: req.body.name,
        UserId: req.body.user.id
      })
      res.send(newCommunity)
    } catch (err) {
      res.status(400).send({
        error: 'You must be logged in to do that'
      })
    }
  },
  
  async edit (req, res) {
    try {
    const response = await models.Community.findOne({
      where: {
        name: req.params.community
      }
    })
    if (response) {
      await response.update({
        greeting: req.body.greeting
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