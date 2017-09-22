const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./config/config')
const routes = require('./routes')

const app = express()
const http = require('http').Server(app)

const  io = require('socket.io')(http)
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.use(routes)

http.listen(config.port, () => {
  console.log(`Server listening on port: ${config.port}`)
})
