const db = require('../../models')
const models = db.sequelize.models

const socket = (_io, socket, clients, users, socketList, socketUsers) => {
  
  const that = {}
  
  that.connect = async (c) => {
    console.log('hello world!')
      if (socket.request.user) {
        socketUsers[socket.request.user.username] = socket.id
        const response = await models.Community.findAll({
          include: [{model: models.User}],
          where: {
            name: c
          }
        }).map(key => key.toJSON())
        const banned = await models.Banned.findOne({
          where: {
            CommunityId: response[0].id,
            username: socket.request.user.username
          }
        })
        if (!banned) {
          socket.join(c)
          if (response[0]) {
            if (response[0].User.username === socket.request.user.username) {
              clients[socket.request.user.username] = {
                isAdmin: true,
                c: c
              }
            } else {
              clients[socket.request.user.username] = {
                isAdmin: false,
                c: c
              }
            }
          }
          console.log(clients)
          socket.emit('updateRoom', c)
          socket.emit('greeting', {
            message: response[0].greeting
          })
          // _io.sockets.in(c).emit('update', {
          //   username: socket.request.user.username,
          //   status: clients[socket.request.user.username],
          //   message: ' has connected'
          // })
          socket.emit('greeting', {
            message: 'You have connected to ' + response[0].name
          })
          _io.sockets.in(c).emit('updateUsers', users(c))
        }
      }
  }
  that.leave = (val) => {
    if (socket.request.user) {
      _io.sockets.in(socket.id).emit('updateLocal', {
        users: null
      })
      _io.sockets.in(socket.id).emit('updateRoom', null)
      _io.sockets.in(val.c).emit('update', {
        username: socket.request.user.username,
        status: clients[socket.request.user.username],
        message: ' has left'
      })
      delete clients[socket.request.user.username]
      socket.in(val.c).emit('updateUsers', users(val.c))
      socket.leave(val.c)
    }
  }
    
  return that
}
module.exports = socket