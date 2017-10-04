const db = require('./models')
const models = db.sequelize.models
const _ = require('lodash')

const returnSocket = (io) => {
  const _io = io
  
    var clients = {}
    var currentUsers = {}

    var users = function (room) {
      var users = []
      Object.keys(currentUsers).forEach(function(key) {
        if (currentUsers[key].room == room) {
          users.push({
            username: currentUsers[key].username,
            isAdmin: currentUsers[key].isAdmin
          })
        }
      })
      return users
    }



  _io.on('connection', function(socket) {
    console.log('connected')
    socket.on('join', async function(data, c) {
      if (clients[socket.id]) {
        return
      }
      const response = await models.Community.findAll({
          include: [{model: models.User}],
          where: {
            UserId: data.user.id,
            name: c.community
          }
        }).map(key => key.toJSON())
        
        socket.join(data.name)
        var rooms = _io.sockets.adapter.rooms
        // give admin/creator % sign to signify admin
        if (response[0]) {
          if (response[0].User.token === data.user.token) {
            clients[socket.id] = {
              isAdmin: true,
              username: '%' + response[0].User.username,
              room: data.name
            }
          }
        } else {
          clients[socket.id] = {
            isAdmin: false,
            username: data.user.username,
            room: data.name
          }
        }
        Object.keys(rooms).forEach(function(key) {
          if (key == data.name) {
            currentUsers[socket.id] = {
              username: data.user.username,
              room: key,
              isAdmin: clients[socket.id].isAdmin
            }
          }
        })
        
        console.log(socket.request.user.dataValues)
      
      socket.emit('update', {
        user: '',
        message: 'You have connected to ' + data.name
      })
      _io.sockets.in(data.name).emit('update', {
        user: clients[socket.id],
        message: ' has connected'
      })
      _io.sockets.in(data.name).emit('updateUsers', {
        users: users(clients[socket.id].room)
      })
      socket.emit('updateRoom', {
        room: clients[socket.id].room,
      })
    })
    
    socket.on('leave', function(data) {
      if (clients[socket.id] !== null) {
          _io.sockets.in(data.name).emit('update', {
            user: clients[socket.id],
            message: ' has left'
          })
          _io.sockets.in(socket.id).emit('updateAdmin', null)
          delete currentUsers[socket.id]
          delete clients[socket.id]
          socket.leave(data.name)
          socket.in(data.name).emit('updateUsers', {
            users: users(data.name)
            })
          socket.emit('updateRoom', {
            room: null,
          })
          socket.emit('updateLocal', {
            users: null
          })
      }
    })
    
    
    socket.on('message', function(data) {
      console.log(data)
      if (clients[socket.id]) {
        _io.sockets.in(clients[socket.id].room).emit('newMessage', {
          user: clients[socket.id],
          message: data.message
        })
      }
    })
    
    _io.on('disconnect', function() {
      console.log('User disconncted')
    })
  })

  
  
  return _io
}

module.exports = returnSocket