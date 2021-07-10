const { MessageReceiver } = require('../messaging')
const config = require('../config')

module.exports = [{
  method: 'GET',
  path: '/result',
  handler: async (request, h) => {
    const queueReceiver = new MessageReceiver('queue-receiver', config.sessionQueueConfig, request.yar.id)
    const messages = await queueReceiver.receiveMessages(1, { maxWaitTimeInMs: 5000 })
    await queueReceiver.closeConnection()
    if (messages.length) {
      return h.view('result', { result: messages[0].body })
    }
    return h.view('result', { result: 'No response' })
  }
}]
