var es = require('./common').es

// Drop and add the index in case it was left around in a partial state
es.delete(function (err, res) {
  if (err) throw err
  es.create(function (err) {
    if (err) throw err
  })
})
