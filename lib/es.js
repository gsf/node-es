// very simple elasticsearch request wrapper

var http = require('http');

exports.request = function(options, callback) {
  var defaults = {
    host: '127.0.0.1',
    port: 9200,
    path: '/dummy/_search',
    method: 'GET'
  };
  var options = union(options, defaults);
  var req = http.request(options, function(res) {
    var data = '';
    res.on('data', function(chunk) {
      data += chunk;
    });
    res.on('end', function() {
      if (options.debug) console.log(data);
      if (res.statusCode == 200) {
        var result = JSON.parse(data);
        callback(null, result);
      } else {
        callback(new Error(data));
      }
    });
  });
  req.on('error', function(e) {
    if (options.debug) console.log("Error: " + e.message);
    callback(e);
  });
  req.end(JSON.stringify(options.data));
};


// Helper functions

// Grabbed from Express
var union = function(a, b){
  if (a && b) {
    var keys = Object.keys(b)
      , len = keys.length
      , key;
    for (var i = 0; i < len; ++i) {
      key = keys[i];
      if (!a.hasOwnProperty(key)) {
        a[key] = b[key];
      }
    }
  }
  return a;
};
