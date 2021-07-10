const MessageBase = require('./message-base')

class MessageReceiver extends MessageBase {
  constructor (name, config, sessionId) {
    super(name, config)
    this.receiver = this.sbClient.acceptSession(config.address, sessionId)
  }

  async receiveMessages (count, options) {
    return (await this.receiver).receiveMessages(count, options)
  }

  async closeConnection () {
    await (await this.receiver).close()
    await super.closeConnection()
  }
}

module.exports = MessageReceiver
