const db = require('../models')
const models = db.sequelize.models

module.exports = {
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
        error: 'Something went wrong attempting to create Community'
      })
    }
  }
}