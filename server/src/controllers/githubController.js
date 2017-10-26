var qs = require('querystring')
const request = require('request');

module.exports = {
  github (req, res) {
    
    request({
      url: 'https://github.com/login/oauth/access_token',
      method: 'POST',
     qs: {
      client_id: req.body.clientId,
      client_secret: '917cfeffcb715130e842bfeb0b4370ffbd6e5a8b',
      code: req.body.code,
      redirect_uri: req.body.redirectUri
    }}, function (e, r, body) {
      const val = qs.parse(body)
      res.send(val)
    })
  },

  user (req, res) {
    request({
      url:  'https://api.github.com/user',
      method: 'GET',
      headers: {
        'User-Agent': 'xyzfordays'
      },
      qs: {
        access_token: req.token
      }
    }, function (e, r, body) {
      const val = JSON.parse(body)
      const user = {
        id: val.id,
        username: val.login,
        avatar: val.avatar_url
      }
      req.user = user
      res.send(user)
    })
  }
}