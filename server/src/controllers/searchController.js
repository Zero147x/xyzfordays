const db = require('../models')
const models = db.sequelize.models

module.exports = {
  async index (req, res) {
    try {
      const search = req.query.search
      let result = null
      if (search) {
        result = await models.Community.findAll({
          limit: 10,
          where: {
            $or: [
              'name'
            ].map(key => ({
              [key]: {
                $like: `%${search}%`
              }
            }))
          },
        })
      }
      res.send(result)
    } catch (err) {
      res.status(400).send({
        error: 'Search failed'
      })
    }
  }
}
