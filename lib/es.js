// very simple elasticsearch request wrapper

var http = require('http');

exports.DEBUG = false;

exports.DEFAULTS = {
  host: '127.0.0.1',
  port: 9200,
  path: '/dummy/_search',
  method: 'GET',
  data: '',
  debug: false
};

exports.request = function(options, callback) {
  var options = union(options, exports.DEFAULTS);
  var req = http.request(options, function(res) {
    var data = '';
    res.on('data', function(chunk) {
      data += chunk;
    });
    res.on('end', function() {
      if (exports.DEBUG || options.debug) console.log(data);
      // if parent res in options and respond is true just pass data
      if (options.res && options.respond) {
        options.res.writeHead(res.statusCode, {'Content-Type': 'application/json'});
        options.res.end(data);
        return;
      }
      if (res.statusCode == 200) {
        callback(null, data);
      } else {
        // if parent res in options pass err data and don't call callback
        if (options.res) {
          options.res.writeHead(res.statusCode, {'Content-Type': 'application/json'});
          options.res.end(data);
          return;
        }
        callback(new Error(data));
      }
    });
  });
  req.on('error', function(e) {
    if (exports.DEBUG || options.debug) console.log("Error: " + e.message);
    callback(e);
  });
  req.end(options.data);
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
