const returnSocket = (io) => {
  const _io = io
    
    var clients = {}

  _io.on('connection', function(socket) {
    console.log('connected')
    socket.on('join', function(data) {
      if (clients[socket.id]) {
        return
      }
        socket.join(data.room)
        clients[socket.id] = data.user
      
      
      socket.emit('update', 'You have connected to the chatroom')
      _io.sockets.emit('update', data.user + " has joined the chatroom")
      console.log(clients)
      _io.sockets.emit('updateUsers', clients)
    })
    
    socket.on('leave', function(data) {
      if (clients[socket.id]) {
        _io.sockets.emit('update', clients[socket.id] + " has left the chatroom")
        delete clients[socket.id]
        _io.sockets.emit('updateUsers', clients)
        socket.leave(data.room)
      }
    })
    
    var room = 'chat'
    socket.on('message', function(msg) {
      console.log(msg)
      if (clients[socket.id]) {
        _io.sockets.in(room).emit('newMessage', {
          user: clients[socket.id],
          message: msg.message
        })
      }
    })
  })
  
  return _io
}

module.exports = returnSocket