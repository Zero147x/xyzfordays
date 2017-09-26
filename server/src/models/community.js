module.exports = (sequelize, DataTypes) => {
  const Community = sequelize.define('Community', {
    name: {
      type: DataTypes.STRING,
      unique: true
    }
  })
}