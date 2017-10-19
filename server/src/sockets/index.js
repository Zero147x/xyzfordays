const db = require('../models')
const models = db.sequelize.models
const antiSpam  = require('socket-anti-spam')

const returnSocket = (io) => {
  const _io = io

  var socketList = {}
  var socketUsers = {}

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

  _io.on('connection', function (socket) {
    console.log('A user connected')
    
    const join = require('./controllers/join')(_io, socket, clients, users, socketList, socketUsers)
    const moderation = require('./controllers/moderation')(socketList, socketUsers, socket)
    const chat = require('./controllers/chat')(_io, socket, clients)
    
    socketList[socket.id] = socket
    
    socket.on('join', join.connect)
    socket.on('leave', join.leave)
    socket.on('message', chat.message)
    socket.on('kick', moderation.kick)
    socket.on('ban', moderation.ban)
    socket.on('logout', () => {
      socket.disconnect()
    })
    
    antiSpam.event.on('kick', (socket, data) => {
      console.log('hello world!')
      _io.sockets.in(socket.id).emit('updateLocal', {
        users: null
      })
      _io.sockets.in(socket.id).emit('updateRoom', null)
      _io.sockets.in(socket.id).emit('greeting', {
        message: 'You have been kicked for spam. Play nice!'
      })
    })
    
    socket.on('disconnect', function () {
      console.log(clients)
      if (typeof socket.request.user !== 'undefined') {
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
  })
  return _io
}

module.exports = returnSocket
