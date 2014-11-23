module.exports = function (config) {
  var _ = require('lodash');

  var _build = require('./url-builder')(config);
  var _get = require('superagent').get;

  var get = _.compose(_get, _build);

  var bind = function (o, fn) {
    return Object.keys(o).reduce(function (fold, item) {
      fold[item] = fn.bind(null, o[item]);
      return fold;
    }, {});
  };

  var common = {
    search: 'SearchDestinyPlayer/{type}/{name}/',
    account: '{type}/Account/{id}'
  };

  var character = {
    inventory: '{type}/Account/{membership}/Character/{id}/Inventory',
    progression: '{type}/Account/{membership}/Character/{id}/Progression',
    activities: '{type}/Account/{membership}/Character/{id}/Activities'
  };

  var Destiny = {};
  _.extend(Destiny, bind(common, get));
  _.extend(Destiny, { character: bind(character, get) });

  return Destiny;
};
