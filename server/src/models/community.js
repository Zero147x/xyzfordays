module.exports = (sequelize, DataTypes) => {
  const Community = sequelize.define('Community', {
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    greeting: DataTypes.STRING
  })
  Community.associate = function (models) {
    Community.belongsTo(models.User)
  }
  return Community
}
