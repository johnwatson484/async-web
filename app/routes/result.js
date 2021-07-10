const { MessageReceiver } = require('ffc-messaging')
const config = require('../config')

module.exports = [{
  method: 'GET',
  path: '/result',
  handler: async (request, h) => {
    let result = 'No response'
    const sessionQueueReceiver = new MessageReceiver(config.sessionQueueConfig)
    await sessionQueueReceiver.acceptSession(request.yar.id)
    const messages = await sessionQueueReceiver.receiveMessages(1, { maxWaitTimeInMs: 5000 })
    if (messages.length) {
      result = messages[0].body.content
      await sessionQueueReceiver.completeMessage(messages[0])
    }
    await sessionQueueReceiver.closeConnection()
    return h.view('result', { result })
  }
}]
