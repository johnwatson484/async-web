const { MessageSender } = require('../messaging')
const config = require('../config')

module.exports = [{
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    return h.view('home')
  }
}, {
  method: 'POST',
  path: '/',
  handler: async (request, h) => {
    const queueSender = new MessageSender('queue-sender', config.queueConfig)
    await queueSender.sendMessage({ body: request.payload.message, correlationId: request.yar.id })
    await queueSender.closeConnection()
    return h.redirect('/result')
  }
}]
