var es = require('./common').es

es.create({
  id: 'hq3',
  type: 'clever',
  name: 'handy'
}, {
  id: 'no4',
  type: 'brandy',
  name: 'pool party'
}, {
  id: 'ba3',
  type: 'clever',
  name: 'handy man'
}, function(err) {
  if (err) throw err
  es.search({
    sort: 'id',
    query: {
      query_string: 'name:handy'
    }
  }, function (err, data) {
    if (err) throw err
    // TODO check data

    // Clean up
    es.delete({ids: {values: ['hq3', 'no4', 'ba3']}}, function (err) {
      if (err) throw err
    })
  })
})
