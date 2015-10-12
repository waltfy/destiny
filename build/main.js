'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _es6Promise = require('es6-promise');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _utils = require('./utils');

var _endpoints = require('./endpoints');

var _endpoints2 = _interopRequireDefault(_endpoints);

if (!global.fetch) {
    require('isomorphic-fetch');
}

var HOST = 'https://www.bungie.net/platform/Destiny/'; // the is address to Bungie's API
var API_KEY;

/** FIXME: this could potentially be broken up into smaller blocks
 *
 * appends a spec to the lirary via iteration.
 *
 * lib - Object, intially empty.
 * item - Object, Destiny::Method.
 */
var createRequest = function createRequest(lib, method) {

    var template = _lodash2['default'].template(method.url); // README: so that we can have parametised URLs

    lib[method.name] = function (params, headers) {
        return _es6Promise.Promise.resolve(params).then(function (params) {

            // throw if parameters isn't an object
            if (!_lodash2['default'].isObject(params)) {
                _utils.UTILS.error('Argument must be an Object containing: ' + method.required.join(', ') + '.');
            }

            // iterate over required fields to aggregate missing ones if not present in current call
            var missing = method.required.filter(function (field) {
                return !params.hasOwnProperty(field);
            });

            // throw for any missing required fields
            if (missing.length > 0) {
                _utils.UTILS.error('Please provide [' + missing.join(', ') + '] to Destiny.' + method.name + '()');
            }

            return params;
        }).then(function (params) {
            var options = _lodash2['default'].merge(method.options || {}, {
                headers: _lodash2['default'].merge(headers || {}, {
                    'x-api-key': API_KEY
                }),
                body: JSON.stringify(params)
            });

            if (options.method === _utils.UTILS.METHODS.GET) {
                delete options.body;
            }

            return fetch('' + HOST + template(params), options);
        }).then(_utils.UTILS.json).then(_utils.UTILS.unwrapDestinyResponse);
    };

    return lib;
};

/**
 * preparing library for export
 */
var Destiny = function Destiny() {
    var apiKey = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];
    var host = arguments.length <= 1 || arguments[1] === undefined ? 'https://www.bungie.net/platform/Destiny/' : arguments[1];

    if (!_lodash2['default'].isString(apiKey) || _lodash2['default'].isEmpty(apiKey)) {
        _utils.UTILS.error('You must provide a valid api key. Expected: String, got: ' + typeof apiKey + '. Get a key at: https://www.bungie.net/developer');
    }

    if (_lodash2['default'].isString(host)) {
        HOST = host;
        API_KEY = apiKey;
    } else {
        _utils.UTILS.error(host + ' is not a valid URL.');
    }

    return _endpoints2['default'].reduce(createRequest, {});
};

exports['default'] = Destiny;
module.exports = exports['default'];