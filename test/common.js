var es = require('es')

exports.es = es({
  host: '127.0.0.1',
  port: 9200,
  index: 'estest'
})
