const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./config/config')
const {sequelize} = require('./models')

const bearerToken = require('express-bearer-token')

const app = express()
const http = require('http').Server(app)

const io = require('socket.io')(http)
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use(bearerToken())

const routes = require('./routes')(io)
require('./passport')

app.use(routes)

app.use(function (req, res) {
  res.send('Token ' + req.token)
})

io.on('connection', function (socket) {
  socket.on('auth', function (val) {
    socket.request.user = val
  })
})

const antiSpam  = require('socket-anti-spam')
antiSpam.init({
      banTime:            1,         // Ban time in minutes 
      kickThreshold:      5,          // User gets kicked after this many spam score 
      kickTimesBeforeBan: 5,          // User gets banned after this many kicks 
      banning:            false,       // Uses temp IP banning after kickTimesBeforeBan 
      heartBeatStale:     40,         // Removes a heartbeat after this many seconds 
      heartBeatCheck:     4,          // Checks a heartbeat per this many seconds 
  })

antiSpam.event.on('kick', (socket, data) => {
  console.log(data)
  console.log('kicked')
})
antiSpam.event.on('ban', (socket, data) => {
  console.log(data)
  console.log('banned')
})

require('./sockets')(io)

sequelize.sync().then(() => {
  http.listen(config.port, () => {
    console.log(`Server listening on port: ${config.port}`)
  })
})
