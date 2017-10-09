const db  = require('../models')
const models = db.sequelize.models

module.exports = {
  async index (req, res, next) {
    try {
      const search = req.query.search
      console.log(search)
      let result = null
      if (search) {
        result = await models.Community.findAll({
          where: {
            $or: [
              'name'
            ].map(key => ({
              [key]: {
                $like: `%${search}%`
              }
            }))
          }
        })
      }
      res.send(result)
    } catch (err) {
      res.status(400).send({
        error: 'Search failed'
      })
    }
  },
  async home (req, res, next) {
    const response = await models.Community.findAll({
      limit: 10
    })
    res.send(response)
  }
}