module.exports = (sequelize, DataTypes) => {
  const userList = sequelize.define('userList', {
    username: DataTypes.STRING
  })
  return userList
}