#!/usr/env/bin node

/**
 * Super hacky proxy server
 *
 * $ chmod +x proxy
 * $ ./proxy 9000 or $ node proxy.js 9000
 */
var https = require('https');
var http = require('http');
var url = require('url');

var BUNGIE = {
  host: 'www.bungie.net',
  port: 443
};

function copyHeaderFrom(source) {
  return function (target, k) {
    if (typeof target[k.toLowerCase()] === 'undefined') {
      target[k] = source[k];
    }
    return target;
  };
}

http.createServer(function(req, res) {
  var outboundData = {
    method: req.method,
    host: BUNGIE.host,
    port: BUNGIE.port,
    path: req.url,
    headers: req.headers
  };

  outboundData.headers.host = BUNGIE.host;

  console.log('outbound request ========================');
  console.log(outboundData);

  if (outboundData.method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': outboundData.headers['access-control-request-headers'] || ''
    });
    return res.end();
  }

  https.request(outboundData, function (bungieRes) {
    var initialHeaders = {
      'access-control-allow-origin': '*',
      'origin': outboundData.headers.origin
    };
    res.writeHead(
      bungieRes.statusCode,
      Object.keys(bungieRes.headers).reduce(copyHeaderFrom(bungieRes.headers), initialHeaders)
    );
    bungieRes.pipe(res);
  }).end();

}).listen(process.argv[2], function() {
  console.log('Bungie Proxy Server up at http://%s:%s', this.address().address, this.address().port);
});
