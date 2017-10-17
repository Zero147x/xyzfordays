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
        // antiSpam.addSpam(socket)
        // antiSpam.event.on('kick', (socket, data) => {
        //   _io.sockets.in(socket.id).emit('updateLocal', {
        //     users: null
        //   })
        //   _io.sockets.in(socket.id).emit('updateRoom', null)
        //   _io.sockets.in(socket.id).emit('greeting', {
        //     message: 'You have been kicked for spam. Play nice!'
        //   })
        // })
        // antiSpam.event.on('spamscore', (socket, data) => {
        //   console.log(data)
        // })
      }
    }
    
  return that
}
module.exports = socket