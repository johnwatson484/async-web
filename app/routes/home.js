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
    request.yar.set('message', request.payload.message)
    return h.redirect('/result')
  }
}]
