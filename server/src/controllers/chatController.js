module.exports = (io) => {
  var that = {}
  /*Create local private io variable
    to avoid accidentally altering 
    it by mistake*/
  const _io = io
  
  that.post = (req, res) => {
    res.send(req.body)
    _io.emit('message', (req.body))
  }
  return that
}