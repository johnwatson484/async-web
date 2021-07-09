const config = require('../config')
const { v4: uuidv4 } = require('uuid')

module.exports = {
  plugin: require('@hapi/yar'),
  options: {
    storeBlank: true,
    maxCookieSize: config.useRedis ? 0 : 1024,
    cache: {
      cache: 'session',
      expiresIn: 3600 * 1000 // 1 hour
    },
    cookieOptions: {
      password: 'thisisobviouslynotarealpasswordbutyouarewelcometotry',
      isSecure: false
    },
    customSessionIDGenerator: function (request) {
      return uuidv4()
    }
  }
}
