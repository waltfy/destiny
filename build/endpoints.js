'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true
});

var _utils = require('./utils');

/**
 * List of GET Endpoints available on the Destiny API
 */
var GET = [{ name: 'Search', url: 'SearchDestinyPlayer/${ membershipType }/${ name }/', required: ['membershipType', 'name'] }, { name: 'Account', url: '${ membershipType }/Account/${ membershipId }/', required: ['membershipType', 'membershipId'] }, { name: 'Character', url: '${ membershipType }/Account/${ membershipId }/Character/${ characterId }/', required: ['membershipType', 'membershipId', 'characterId'] }, { name: 'Activities', url: '${ membershipType }/Account/${ membershipId }/Character/${ characterId }/Activities/', required: ['membershipType', 'membershipId', 'characterId'] }, { name: 'Inventory', url: '${ membershipType }/Account/${ membershipId }/Character/${ characterId }/Inventory/', required: ['membershipType', 'membershipId', 'characterId'] }, { name: 'Progression', url: '${ membershipType }/Account/${ membershipId }/Character/${ characterId }/Progression/', required: ['membershipType', 'membershipId', 'characterId'] }].map(_utils.UTILS.assignMap({ options: { method: _utils.UTILS.METHODS.GET, headers: _utils.UTILS.HEADERS } }));

/**
 * List of POST Endpoints available on the Destiny API
 */
var POST = [{ name: 'Equip', url: 'EquipItem', required: ['characterId', 'itemId', 'membershipType'] }, { name: 'TransferItem', url: 'TransferItem', required: ['characterId', 'itemId', 'itemReferenceHash', 'membershipType'] }].map(_utils.UTILS.assignMap({ options: { method: _utils.UTILS.METHODS.POST, headers: _utils.UTILS.HEADERS } }));

var ENDPOINTS = [].concat(GET, POST);

exports['default'] = ENDPOINTS;
module.exports = exports['default'];