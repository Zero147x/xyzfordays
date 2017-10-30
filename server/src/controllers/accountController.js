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
          id: req.session.user.id,
          username: req.session.user.username
        }
      })
      const response = await user.update({
        avatar: req.body.src
      })
      res.send(response)
    }
  },
  async index (req, res) {
    const response = await models.User.findOne({
      where: {
        username: req.params.username
      }
    })
    if (response) {
      const user = response.toJSON()
      if (!(user.username === req.session.user.username)) {
        res.send({
          error: 'You do not have permission'
        })
      }
    } else {
      res.send({
        error: 'User does not exist'
      })
    }
    res.send(req.session.user)
  }
}