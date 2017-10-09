const db = require('./models')
const models = db.sequelize.models
const _ = require('lodash')

const returnSocket = (io) => {
  const _io = io
  
    var socketList = {}
  
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
    console.log('A user connected')
    
    socketList[socket.id] = socket
    
    
    socket.on('join', async function(c) {
    if (socket.request.user) {
      console.log(socket.request.user)
      const response = await models.Community.findAll({
          include: [{model: models.User}],
          where: {
            name: c
          }
        }).map(key => key.toJSON())
        socket.join(c)
        var rooms = _io.sockets.adapter.rooms

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
      
      _io.sockets.in(c).emit('update', {
        username: socket.request.user.username,
        status: clients[socket.request.user.username],
        message: ' has connected'
      })
      
      _io.sockets.in(c).emit('updateUsers', users(c))

    }
  })
    
    socket.on('leave', function(val) {
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
  })
    
    
    socket.on('message', function(val) {
      if (clients[socket.request.user.username]) {
        _io.sockets.in(clients[socket.request.user.username].c).emit('newMessage', {
          username: socket.request.user.username,
          status: clients[socket.request.user.username],
          message: val.message
        })
      }
    })
    
    
    
    
    socket.on('disconnect', function() {
      console.log('hello world!!!')
      // Need this for now until I can find a better solution.
      // After disconnect event is fired, the transport closes, preventing
      // me from passing data from the client.
      console.log(clients)
    if (typeof socket.request.user != 'undefined') {
      if (clients[socket.request.user.username]) {
        let room = clients[socket.request.user.username].c
        
        _io.sockets.in(clients[socket.request.user.username].c).emit('update', {
          username: socket.request.user.username,
          status: clients[socket.request.user.username],
          message: ' has left'
        })
        
        _io.sockets.in(socket.id).emit('updateRoom', null)
        
        delete clients[socket.request.user.username]
        
        _io.sockets.in(room).emit('updateUsers',
        users(room))
        
        socket.leave(room)
        delete socketList[socket.id]
        delete socket.request.user
        console.log('User disconncted')
      }
    }
  })
  
    
    socket.on('logout', function () {
      socket.disconnect()
    })
})


  
  
  return _io
}

module.exports = returnSocket