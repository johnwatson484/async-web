
module.exports = [{
  method: 'GET',
  path: '/result',
  handler: (request, h) => {
    const result = 'result'
    return h.view('result', { result })
  }
}]
