const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')
const db = {}

const sequelize = new Sequelize(
  config.db.database,
  config.db.options
)

fs
  .readdirSync(__dirname)
  .filter((file) =>
    file !== 'index.js'
  )
  .forEach((file) => {
    sequelize.import(path.join(__dirname, file))
  })
db.sequelize = sequelize
db.Sequelize = Sequelize

Object.keys(sequelize.models).forEach(function (modelName) {
  if ('associate' in sequelize.models[modelName]) {
    sequelize.models[modelName].associate(sequelize.models)
  }
})

module.exports = db
