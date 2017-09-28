module.exports = (sequelize, DataTypes) => {
  const Community = sequelize.define('Community', {
    name: {
      type: DataTypes.STRING,
      unique: true
    }
  })
  
  Community.associate = function (models) {
    Community.belongsTo(models.User)
  }
  
  return Community
}