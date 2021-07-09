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
    await queueSender.sendMessage({ message: { body: request.payload.message } })
    await queueSender.closeConnection()
    return h.redirect('/result')
  }
}]
