const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy;
const config = require('../config/config')
const request = require('request');

module.exports = function (req, res, next) {
  request({
    url:  'https://api.github.com/user',
    method: 'GET',
    headers: {
      'User-Agent': 'xyzfordays'
    },
    qs: {
      access_token: req.token
    }
  },  async function (e, r, body) {
    const val = JSON.parse(body)
    
  })
}
