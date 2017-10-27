module.exports = (sequelize, DataType) => {
  const Authentication_profile = sequelize.define('Authentication_profile', {
    username: DataType.STRING,
    authType: DataType.STRING,
    authId: DataType.INTEGER
  })
  
  return Authentication_profile
}