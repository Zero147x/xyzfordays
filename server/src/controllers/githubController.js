const db = require('../models')
const models = db.sequelize.models
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
    if (!req.query.username) {
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
        try {
          const val = JSON.parse(body)
          const authProf = await models.Authentication_profile.findOne({
            where: {
              authId: val.id
            }
          })
          console.log(authProf)
          const response = await models.User.findOne({
            include: [{model: models.Authentication_profile}],
            where: {
              username: val.login
            }
          })
          if (authProf) {
            const userProf = await models.User.findOne({
              include: [{model: models.Authentication_profile}],
              where: {
                AuthenticationProfileId: authProf.id
              }
            })
            res.send(userProf)
            console.log(userProf)
          }
          if (response) {
            console.log(response.toJSON())
            if (response.Authentication_profile) {
              if (response.Authentication_profile.authId === val.id) {
                res.send(response)
              } 
            } else if (response.username === val.login) {
              res.send({
                error: 'Username is already taken'
              })
            }
          } else if (!response) {
            const auth = await models.Authentication_profile.create({
              username: val.login,
              authId: val.id,
              authType: 'Github',
            })
            const u = await models.User.create({
              username: val.login,
              avatar: val.avatar_url,
              AuthenticationProfileId: auth.id
            })
            const user = await models.User.findOne({
              include: [{model: models.Authentication_profile}],
              where : {
                username: val.login
              }
            })
            req.user = user
            res.send(user)
          }
        } catch (err) {
          console.log(err)
        }
      })
    } else if (req.query.username) {
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
        const response = await models.User.findOne({
          where: {
            username: req.query.username
          }
        })
        if (response) {
          res.send({
            error: 'Username already taken'
          })
        } else if (!response) {
        const auth = await models.Authentication_profile.create({
          username: val.login,
          authId: val.id,
          authType: 'Github',
        })
        const u = await models.User.create({
          username: req.query.username,
          avatar: val.avatar_url,
          AuthenticationProfileId: auth.id
        })
        const user = await models.User.findOne({
          include: [{model: models.Authentication_profile}],
          where : {
            username: req.query.username
          }
        })
      req.user = user
      res.send(user)
      }
    })
      
    }
  }
}