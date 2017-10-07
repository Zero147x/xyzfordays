const db = require('./models')
const models = db.sequelize.models
const _ = require('lodash')

const returnSocket = (io) => {
  const _io = io
  
    var clients = {}
    
    var users = function (room) {
      let users = []
        Object.keys(clients).forEach(function (key) {
        if (clients[key].c === room) {
          users.push({
            username: key,
            status: clients[key]
          })
        }
      })
      return users
    }


  _io.on('connection', function(socket) {
    console.log('connected')
    socket.on('join', async function(c) {
      
      const response = await models.Community.findAll({
          include: [{model: models.User}],
          where: {
            name: c
          }
        }).map(key => key.toJSON())
        socket.join(c)
        var rooms = _io.sockets.adapter.rooms

        if (response[0]) {
          if (response[0].User.username === socket.request.user.dataValues.username) {
            clients[socket.request.user.dataValues.username] = {
              isAdmin: true,
              c: c
            }
          } else {
            clients[socket.request.user.dataValues.username] = {
              isAdmin: false,
              c: c
            }
          }
        }
        
        
      socket.emit('update', {
        user: '',
        message: response[0].greeting
      })
      _io.sockets.in(c).emit('update', {
        username: socket.request.user.dataValues.username,
        status: clients[socket.request.user.dataValues.username],
        message: ' has connected'
      })
      
      _io.sockets.in(c).emit('updateUsers', users(c))

      socket.emit('updateRoom', {
        room: clients[socket.request.user.dataValues.username].room,
      })
      
    })
    
    
    socket.on('leave', function(val) {
          _io.sockets.in(socket.id).emit('updateLocal', {
            users: null
          })
          _io.sockets.in(val.c).emit('update', {
            username: socket.request.user.dataValues.username,
            status: clients[socket.request.user.dataValues.username],
            message: ' has left'
          })
          delete clients[socket.request.user.dataValues.username]
          socket.in(val.c).emit('updateUsers', users(val.c))
          socket.leave(val.c)
    })
    
    
    socket.on('message', function(val) {
      console.log(val)
      _io.sockets.in(clients[socket.request.user.dataValues.username].c).emit('newMessage', {
        username: socket.request.user.dataValues.username,
        status: clients[socket.request.user.dataValues.username],
        message: val.message
      })
    })
    
    socket.on('disconnect', function() {
      _io.sockets.in(clients[socket.request.user.dataValues.username].c).emit('update', {
        username: socket.request.user.dataValues.username,
        status: clients[socket.user.dataValues.username],
        message: ' has left'
      })
      
      _io.sockets.in(clients[socket.request.user.dataValues.username].c).emit('updateUsers', {
        users: users(clients[socket.request.user.dataValues.username])
        })
      socket.leave(clients[socket.request.user.dataValues.username].c)
      console.log('User disconncted')
      delete clients[socket.request.user.dataValues.username]
    })
  })

  
  
  return _io
}

module.exports = returnSocket