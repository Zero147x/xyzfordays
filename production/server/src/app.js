const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./config/config')
const {sequelize} = require('./models')

const jwtAuth = require('socketio-jwt-auth');

const db = require('./models')
const models = db.sequelize.models

const app = express()
const http = require('http').Server(app)

const  io = require('socket.io')(http)
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

const routes = require('./routes')(io)
require('./passport')

app.use(routes)

io.use(jwtAuth.authenticate({
  secret: config.authentication.jwtSecret,    // required, used to verify the token's signature 
  algorithm: 'HS256',       // optional, default to be HS256
}, async function(payload, done) {
  // done is a callback, you can use it as follow 
  await models.User.findOne({where: {id: payload.id}}).then( (user, err) => {
    if (err) {
      // return error 
      return done(err);
      
    }
    if (!user) {
      // return fail with an error message 
      return done(null, false, 'user not exist');
    }
    // return success with a user info 
    return done(null, user);
  });
}));

require('./sockets')(io)

sequelize.sync().then(() => {
  http.listen(config.port, () => {
    console.log(`Server listening on port: ${config.port}`)
  })
})
