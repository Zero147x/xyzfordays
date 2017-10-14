module.exports = (sequelize, DataType) => {
  const Banned = sequelize.define('Banned', {
    username: DataType.STRING
  })
  
  Banned.associate = function (models) {
    Banned.belongsTo(models.Community)
  }
  return Banned
}