const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./config/config')
const {sequelize} = require('./models')
const bearerToken = require('express-bearer-token');
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const passport = require('passport')
const sequelizeStore = require('connect-session-sequelize')(expressSession.Store)
const Store = new sequelizeStore({db: sequelize})

const app = express()
const http = require('http').Server(app)

const io = require('socket.io')(http)
app.set('trust proxy', 1);

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors({
  origin:[config.origin],
  methods:['GET','POST'],
  credentials: true // enable set cookie
}))
app.use(bearerToken());
app.use(cookieParser(config.authentication.sessionSecret))
app.use(expressSession({
  resave: false,
  saveUninitialized: true,
  secret: config.authentication.sessionSecret,
  store: Store,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}))


const routes = require('./routes')(io)
require('./passport')

app.use(routes)

io.on('connection', function (socket) {
  socket.on('auth', function (val) {
    socket.request.user = val
  })
})

// const antiSpam  = require('socket-anti-spam')
// antiSpam.init({
//     banTime:            1,          // Ban time in minutes 
//     kickThreshold:      5,          // User gets kicked after this many spam score 
//     kickTimesBeforeBan: 2,          // User gets banned after this many kicks 
//     banning:            false,      // Uses temp IP banning after kickTimesBeforeBan 
//     heartBeatStale:     12,         // Removes a heartbeat after this many seconds 
//     heartBeatCheck:     4,          // Checks a heartbeat per this many seconds 
// })

require('./sockets')(io)

sequelize.sync().then(() => {
  http.listen(config.port, () => {
    console.log(`Server listening on port: ${config.port}`)
  })
})
