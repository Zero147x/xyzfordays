const returnSocket = (io) => {
  const _io = io
    
    var clients = {}
    var currentUsers = {}

    var users = function (room) {
      var users = []
      Object.keys(currentUsers).forEach(function(key) {
        if (currentUsers[key] == room) {
          users.push(key)
        }
      })
      return users
    }




  _io.on('connection', function(socket) {
    console.log('connected')
    socket.on('join', function(data) {
      if (clients[socket.id]) {
        return
      }
        socket.join(data.name)
        clients[socket.id] = data.user
        
        var rooms = _io.sockets.adapter.rooms

        Object.keys(rooms).forEach(function(key) {
          if (key == data.name) {
            currentUsers[clients[socket.id]] = key
          }
        })
        
      socket.emit('update', 'You have connected to the chatroom')
      _io.sockets.in(data.name).emit('update', clients[socket.id] + " has joined the chatroom")
      _io.sockets.in(data.name).emit('updateUsers', {
        users: users(data.name),
      })
      socket.emit('updateRoom', {
        room: data.name,
      })
    })
    
    socket.on('leave', function(data) {
        _io.sockets.in(data.name).emit('update', clients[socket.id] + " has left the chatroom")
        delete currentUsers[clients[socket.id]]
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
      })
    
    socket.on('message', function(data) {
      console.log(data)
      if (clients[socket.id]) {
        _io.sockets.in(data.name).emit('newMessage', {
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