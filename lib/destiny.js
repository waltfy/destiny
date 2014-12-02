/* jshint node:true */
'use strict';
module.exports = function (config) {
  var _ = require('lodash');

  var _build = require('./url-builder')(config);
  var _get = require('superagent-promise').get;

  var get = _.compose(_get, _build);

  var bind = function (o, fn) {
    return Object.keys(o).reduce(function (fold, item) {
      fold[item] = fn.bind(null, o[item]);
      return fold;
    }, {});
  };

  var common = {
    search: 'SearchDestinyPlayer/{type}/{name}/',
    account: '{type}/Account/{id}',
    main: '{type}/Account/{membership}/Character/{id}/'
  };

  var character = [
    'Activities',
    'Inventory',
    'Progression',
  ].reduce(function (fold, endpoint) {
    fold[endpoint.toLowerCase()] = '{type}/Account/{membership}/Character/{id}/'.concat(endpoint);
    return fold;
  }, {});

  var Destiny = {};
  _.extend(Destiny, bind(common, get));
  _.extend(Destiny, { character: bind(character, get) });

  return Destiny;
};
