const { MessageReceiver } = require('ffc-messaging')
const config = require('../config')

module.exports = [{
  method: 'GET',
  path: '/result',
  handler: async (request, h) => {
    const sessionQueueReceiver = new MessageReceiver(config.sessionQueueConfig)
    await sessionQueueReceiver.acceptSession(request.yar.id)
    const messages = await sessionQueueReceiver.receiveMessages(1, { maxWaitTimeInMs: 5000 })
    await sessionQueueReceiver.closeConnection()
    if (messages.length) {
      return h.view('result', { result: messages[0].body.content })
    }
    return h.view('result', { result: 'No response' })
  }
}]
