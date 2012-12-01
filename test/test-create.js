var es = require('./common').es

es.create({
  id: 'abcd',
  name: 'Sal',
  age: 4
}, function (err) {
  if (err) throw err
})
