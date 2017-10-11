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

console.log('hello world!')

require('./sockets')(io)

sequelize.sync().then(() => {
  http.listen(config.port, () => {
    console.log(`Server listening on port: ${config.port}`)
  })
})
