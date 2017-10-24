const db = require('../models')
const models = db.sequelize.models
const Op = db.Sequelize.Op

module.exports = {
  async index (req, res, next) {
    if (req.query.count) {
      const count = req.query.count
      const response = await models.Community.findAll({
        offset: count - 10,
        limit: 10,
        order: [ [ 'createdAt', 'DESC' ]]
      })
      res.send(response)
    } else if (Object.keys(req.query).length === 0 && req.query.constructor === Object) {
    const response = await models.Community.findAll({
      limit: 10,
      order: [[ 'createdAt', 'DESC' ]]
    })
      res.send(response)
    } else {
      next()
    }
  }
}
