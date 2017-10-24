const db = require('../models')
const models = db.sequelize.models
const isImageUrl = require('is-image-url');

module.exports = {
  async index (req, res) {
    const truthy = isImageUrl(req.body.src)
    if (!truthy) {
      res.send({
        error: 'Must be valid image'
      })
    } else {
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
  }
}