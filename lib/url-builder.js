'use strict';
var CONFIG = require('../config.json');
var template = require('./supplant');
var url = require('url');

function prefix(url) { return CONFIG.DEFAULT_HOST + CONFIG.DEFAULT_BASE_PATH + url };

function build(path, spec) {
  path = prefix(path);

  if (spec.query) {
    path = path.concat(url.format({ query: spec.query }));
    delete spec.query;
  }

  return template(path, spec);
}

module.exports = build;
