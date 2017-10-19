const db = require('../../models')
const models = db.sequelize.models
const antiSpam  = require('socket-anti-spam')

const socket = (_io, socket, clients) => {
  
  
  const that = {}
    
    that.message = (val) => {
      if (typeof socket.request.user !== 'undefined') {
        if (clients[socket.request.user.username]) {
          _io.sockets.in(clients[socket.request.user.username].c).emit('newMessage', {
            username: socket.request.user.username,
            status: clients[socket.request.user.username],
            message: val.message
          })
        }
        antiSpam.addSpam(socket)
      }
    }
    
  return that
}
module.exports = socket