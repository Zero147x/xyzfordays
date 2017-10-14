const db = require('../../models')
const models = db.sequelize.models

const socket = (socketList, socketUsers, socket) => {
  const _socketList = socketList
  const _socketUsers = socketUsers
  
  
  const that = {}
  
  that.kick = (username) => {
    _socketList[_socketUsers[username]].disconnect()
  }
  that.ban = async (username, c) => {
    try {
    const response = await models.Community.findOne({
      where: {
        name: c
      }
    })
    await models.Banned.create({
      CommunityId: response.id,
      username: username
    })
    _socketList[_socketUsers[username]].disconnect()
    } catch (err) {
      console.log('error with request!')
    }
  }
  return that
}
module.exports = socket