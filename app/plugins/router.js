const routes = [].concat(
  require('../routes/home'),
  require('../routes/result')
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, options) => {
      server.route(routes)
    }
  }
}
