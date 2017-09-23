const express = require('express')
const router = express.Router()

const returnRouter = (io) => {
  router.post('/chat', (req, res) => {
    res.send(req.body)
    io.emit('message', (req.body))
  })
  
  return router
}

module.exports = returnRouter