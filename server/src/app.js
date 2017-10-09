const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./config/config')
const {sequelize} = require('./models')
const ExtractJwt = require('passport-jwt').ExtractJwt


const jwtAuth = require('socketio-jwt-auth');
const bearerToken = require('express-bearer-token');

const db = require('./models')
const models = db.sequelize.models

const app = express()
const http = require('http').Server(app)

const  io = require('socket.io')(http)
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use(bearerToken());

const routes = require('./routes')(io)
const passport = require('./passport')

app.use(routes)

app.use(function (req, res) {
  res.send('Token '+req.token);
});



// io.use(jwtAuth.authenticate({
//   secret: config.authentication.jwtSecret,    // required, used to verify the token's signature 
//   algorithm: 'HS256',       // optional, default to be HS256
// }, async function(payload, done) {
//   console.log(payload.id)
//   // done is a callback, you can use it as follow 
//     await models.User.findOne({where: {id: payload.id}}).then( (user, err) => {
//       if (err) {
//         // return error 
//         return done(err);
        
//       }
//       if (!user) {
//         // return fail with an error message 
//         return done(null, false, 'user not exist');
//       }
//       // return success with a user info 
      
//       console.log(user.dataValues.username)
//       return done(null, user);
//     });
//   }
// ))

io.on('connection', function (socket) {
  console.log('hello world!')
  socket.on('auth', function(val) {
    socket.request.user = val
  })
})



require('./sockets')(io)

sequelize.sync().then(() => {
  http.listen(config.port, () => {
    console.log(`Server listening on port: ${config.port}`)
  })
})
