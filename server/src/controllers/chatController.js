module.exports = (io) => {
  var that = {}
  /*Create local private io variable
    to avoid accidentally altering 
    it by mistake*/
  const _io = io
  
  that.index = (req, res) => {
    console.log(req.body)
    res.send(req.body.user.username)
    _io.emit('user', (req.body.user.username))
  }
  
  that.post = (req, res) => {
    res.send(req.body)
    _io.emit('message', (req.body))
  }
  return that
}