// const db = require('../models')
// const models = db.sequelize.models
// const _ = require('lodash')

// module.exports = (io) => {
//   var that = {}
//   /*Create local private io variable
//     to avoid accidentally altering 
//     it by mistake*/
//   const _io = io
  
//   that.userPost = async function (req, res) {
//     try {
//       const username = req.body.user.username
//       const userExists = await models.userList.findAll({
//         where: {
//           username: username
//         }
//       })
//       if (userExists) {
//         return
//       }
//       await models.userList.create({
//         username: username
//       })
//       // _io.emit('user', (newUser))
//     } catch (err) {
//       res.status(400).send({
//         error: 'There was an error inserting to userList'
//       })
//     }
//   }
  
//   that.index =  _.debounce(async function (req, res) {
//     try {
//       const users = await models.userList.findAll()
//       _io.emit('userList', users)
//       console.log(users)
//     } catch (err) {
//       res.status(400).send({
//         error: 'There was an error with your request'
//       })
//     }
//   }, 1000)
//   that.post = (req, res) => {
//     res.send(req.body)
//     _io.emit('message', (req.body))
//   }
//   return that
// }