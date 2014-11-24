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
  host: 'bungie.net',
  port: 443
};
 
http.createServer(function(req, res) {
 
  var data = {
    method: req.method,
    host: BUNGIE.host,
    port: BUNGIE.port,
    path: req.url,
    headers: req.headers
  };
 
  delete data.headers.host;
 
  console.log('request ========================');
  console.log(data);
 
  var headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': data.headers['access-control-request-headers']
  };
 
  if (data.method === 'OPTIONS') {
    res.writeHead(200, headers);
    return res.end();
  }
 
  https.request(data, function(bungieRes) {
    Object.keys(bungieRes.headers).forEach(function(k) {
      headers[k] = bungieRes.headers[k];
    });
    res.writeHead(bungieRes.statusCode, headers);
    bungieRes.pipe(res);
  }).end();
 
}).listen(process.argv[2], function() {
  console.log('Bungie Proxy Server up at //%s:%s', this.address().address, this.address().port);
});
