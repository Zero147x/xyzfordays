let date = require('date-and-time')

export default {
  date (val) {
    return date.format(val, 'hh:mm')
  }
}