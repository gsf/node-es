var es = require('./common').es

// Drop the test index
es.delete(function (err) {
  if (err) throw err
})
