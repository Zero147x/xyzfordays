const db = require('../models')
const models = db.sequelize.models
const isImageUrl = require('is-image-url');

module.exports = {
  async profile (req, res) {
    const truthy = isImageUrl(req.body.src)
    if (!truthy) {
      res.send({
        error: 'Must be valid image'
      })
    } else {
      console.log(req)
      const user = await models.User.findOne({
        where: {
          id: req.user.id,
          username: req.user.username
        }
      })
      const response = await user.update({
        avatar: req.body.src
      })
      res.send(response)
    }
  },
  async index (req, res) {
    console.log(req.params.username)
    const response = await models.User.findOne({
      where: {
        username: req.params.username
      }
    })
    if (response) {
      const user = response.toJSON()
      if (!(user.username === req.user.username)) {
        res.send({
          error: 'You do not have permission'
        })
      }
    } else {
      res.send({
        error: 'User does not exist'
      })
    }
    res.send(req.user)
  }
}