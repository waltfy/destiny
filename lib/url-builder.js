'use strict';
var CONFIG = require('../config.json');
var template = require('./supplant');
var url = require('url');

var BASE = CONFIG.DEFAULT_HOST + CONFIG.DEFAULT_BASE_PATH;

function prefix(url) { return BASE + url };

function build(path, spec) {
  path = prefix(path);

  if (spec.query) {
    path = path.concat(url.format({ query: spec.query }));
    delete spec.query;
  }

  return template(path, spec);
}

module.exports = function (spec) {
  if (typeof spec !== 'undefined') {
    var host = spec.host || CONFIG.DEFAULT_HOST;
    var path = spec.path || CONFIG.DEFAULT_BASE_PATH;
    BASE = host.concat(path);
  }
  return build;
}
