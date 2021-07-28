const { MessageSender, MessageReceiver } = require('ffc-messaging')
const config = require('../config')
const { v4: uuidv4 } = require('uuid')

module.exports = [{
  method: 'GET',
  path: '/result',
  handler: async (request, h) => {
    const message = request.yar.get('message')
    if (!message) {
      return h.redirect('/')
    }
    const messageId = uuidv4()
    const requestMessage = {
      body: { content: message },
      type: 'session test message',
      source: 'async web',
      correlationId: request.yar.id,
      messageId
    }
    const queueSender = new MessageSender(config.queueConfig)
    await queueSender.sendMessage(requestMessage)
    await queueSender.closeConnection()
    let result = 'No response'
    const sessionQueueReceiver = new MessageReceiver(config.sessionQueueConfig)
    await sessionQueueReceiver.acceptSession(messageId)
    const messages = await sessionQueueReceiver.receiveMessages(1, { maxWaitTimeInMs: 5000 })
    if (messages.length) {
      result = messages[0].body.content
      await sessionQueueReceiver.completeMessage(messages[0])
    }
    await sessionQueueReceiver.closeConnection()
    return h.view('result', { result })
  }
}]
