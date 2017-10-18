const Joi = require('joi')
module.exports = {
  name (req, res, next) {
    const schema = {
      name: Joi.string().alphanum().min(5).max(25)
    }
    console.log(req.body)
    const {error} = Joi.validate(req.body.name, schema.name)
    
    if (error) {
      res.send({
        error: 'Community name has to be between 5 and 25 characters'
      })
    } else {
      next()      
    }
  }
}