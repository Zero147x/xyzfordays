// const returnSocket = (io) => {
//   const _io = io
  
//   _io.on('connection', function(socket) {
//     console.log('connected')
//     socket.on('join', function(data) {
//       if (clients[socket.id]) {
//         return
//       }
      
//         socket.join(data.name)
//         clients[socket.id] = data.user
        
//         var rooms = _io.sockets.adapter.rooms

//         Object.keys(rooms).forEach(function(key) {
//           if (key == data.name) {
//             currentUsers[clients[socket.id]] = key
//           }
//         })

//       socket.emit('update', {
//         username: '',
//         message: 'You have connected to ' + data.name
//       })
//       _io.sockets.in(data.name).emit('update', {
//         username: clients[socket.id],
//         message: ' has connected'
//       })
//       _io.sockets.in(data.name).emit('updateUsers', {
//         users: users(data.name),
//       })
//       socket.emit('updateRoom', {
//         room: data.name,
//       })
//     })
//   })
  
//   return _io
// }

// module.exports = returnSocket