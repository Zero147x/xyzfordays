module.exports = (sequelize, DataTypes) => {
  const userList = sequelize.define('userList', {
      username: {
        type: DataTypes.STRING,
        unique: true
    }
  })
  return userList
}