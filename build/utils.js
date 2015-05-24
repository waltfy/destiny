'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function DestinyError(message) {
    Error.call(this);
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name; // function name as error name
    this.message = message;
}

var UTILS = {
    indentity: function indentity(x) {
        return x;
    },
    noop: function noop() {},
    error: function error(message) {
        throw new DestinyError(message);
    },
    assignMap: function assignMap(obj) {
        return _lodash2['default'].partialRight(_lodash2['default'].assign, obj);
    },
    json: function json(res) {
        return res.json();
    },
    unwrapDestinyResponse: function unwrapDestinyResponse(res) {
        if (res.Response && res.Response.data) {
            return res.Response.data;
        } else if (res.Response) {
            return res.Response;
        } else {
            return res;
        }
    },
    METHODS: ['POST', 'GET'].reduce(function (fold, method) {
        fold[method] = method;
        return fold;
    }, {}),
    HEADERS: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};
exports.UTILS = UTILS;