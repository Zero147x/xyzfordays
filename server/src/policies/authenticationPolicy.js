const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      username: Joi.string().alphanum().min(5).max(12),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$'))
    }
    const {error} = Joi.validate(req.body, schema)
    if (error) {
      switch (error.details[0].context.key) {
        case 'username':
          res.send({
            error: 'Username must be between 5-12 characters and alphanumeric'
          })
          break
        case 'password':
          res.send({
            error: 'Password must be between 8-32 characters'
          })
      }
    } else {
      next()
    }
  }
}
