const { MessageSender } = require('ffc-messaging')
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
    const requestMessage = {
      body: { content: request.payload.message },
      type: 'session test message',
      subject: 'test',
      source: 'async web',
      correlationId: request.yar.id
    }
    const queueSender = new MessageSender(config.queueConfig)
    await queueSender.sendMessage(requestMessage)
    await queueSender.closeConnection()
    return h.redirect('/result')
  }
}]
