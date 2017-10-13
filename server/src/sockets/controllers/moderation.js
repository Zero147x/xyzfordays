const socket = (socketList, socketUsers, socket) => {
  const _socketList = socketList
  const _socketUsers = socketUsers
  
  
  const that = {}
  
  that.kick = (user) => {
    _socketList[_socketUsers[user]].disconnect()
  }
  that.ban = (user) => {
    console.log('to be implemented!')
  }
  return that
}
module.exports = socket