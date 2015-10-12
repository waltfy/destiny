Destiny-Client [![npm version](https://badge.fury.io/js/destiny-client.svg)](http://badge.fury.io/js/destiny-client) [![Gitter](https://badges.gitter.im/Destiny-Client.svg)](https://gitter.im/waltfy/destiny?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
====

A simple client for interacting with Bungie's Destiny API.

The intent is to implement [more and more end-points](https://gist.github.com/waltfy/3f707a1ea7454997e484) as time allows.

Please feel free submit issues and requests, or [get in touch](//www.twitter.com/waltfy).

## Getting Started

### Proxy Server

Unfortunately you cannot "hit" `https://bungie.net` directly. So if you plan to use this library in client-side code, due to `CORS` you'll have to run your own proxy server to handle your requests to Bungie for you. I have added an example proxy server ([`proxy.js`](https://github.com/waltfy/destiny/blob/develop/proxy.js)). Simply run `node proxy.js`. Credit to [@phuu](https://github.com/phuu).

### Node

`npm install destiny-client`

Note that if you wish, you may override the default host (`https://bungie.net/`) with your own. i.e. If you have a proxy server to handle your requests. See [proxy-server](#proxy-server) instructions above. Also works with [React Native](https://facebook.github.io/react-native/).

```js
var destiny = require('destiny-client')();

destiny
  .Search({
    memebershipType: 1,
    name: 'waltercarvalho'
  })
  .then(users => {
    console.debug('users', users);
  });
```

### Web

Simply include [`destiny.js`](https://raw.githubusercontent.com/waltfy/destiny/develop/destiny.js) on your page. You will most likely need a proxy server due to `CORS`. See [proxy-server](#proxy-server) instructions above.

```html
<script src='destiny.js' type='text/javascript'></script>
<script type="text/javascript">

    var destiny = Destiny('http://{{ host }}:{{ yourport }}/platform/Destiny/'); // this is your proxy server

    destiny
        .Search({
            memebershipType: 1,
            name: 'waltercarvalho'
        })
        .then(users => {
            console.debug('users', users);
        });
</script>
```

### Acquiring Cookies

**TODO:** Working on automating this, for now simply inspect your resources to find cookies. Guides can be found online.

## API Overview

In all requests `membershipType` is a `Number` representing the account type, or what network you are in. The network types are:
* `1`: XBox Live.
* `2`: PlayStation Network (PSN).

### `Destiny::Search(params)`

> Returns an `Array` of accounts.

`params` (`Object`)

  - `membershipType` - `Number`
  - `name` - `String`, the name of your account.

#### Sample Usage:
```js
var destiny = require('./index')();

destiny
    .Search({
        membershipType: 1,
        name: 'waltercarvalho'
    })
    .then(res => { /* deal with response */ })
    .catch(err => { /* handle error */ });
```

#### Sample Response:
```js
[
    {
        iconPath: '/img/theme/destiny/icons/icon_xbl.png',
        membershipType: 1,
        membershipId: '4611686018439937004',
        displayName: 'waltercarvalho'
    }
]
```

#### Spec

As per defined in [`endpoints.js`](https://github.com/waltfy/destiny/blob/develop/src/endpoints.js).

`{ name: 'Search', url: 'SearchDestinyPlayer/${ membershipType }/${ name }/', required: ['membershipType', 'name'] }`

* * *

### `Destiny::Account(params)`

> Returns an `Object` with details about an account.

`params` (`Object`)
  - `membershipType` - `Number`
  - `membershipId` - `String`, your membership id.

#### Sample Usage:
```js
var destiny = require('./index')();

destiny
    .Account({
        membershipType: 1,
        membershipId: '4611686018439937004'
    })
    .then(res => { /* deal with response */ })
    .catch(err => { /* handle error */ });
```

#### Sample Response:
```js
{ membershipId: '4611686018439937000',
  membershipType: 1,
  characters:
   [ { characterBase: [Object],
       levelProgression: [Object],
       emblemPath: '/common/destiny_content/icons/117285c72a9c89626cd7b3fa3d7226ee.jpg',
       backgroundPath: '/common/destiny_content/icons/2c73bcd2e874e640f158197bb9f2c55d.jpg',
       emblemHash: 776529032,
       characterLevel: 2,
       baseCharacterLevel: 2,
       isPrestigeLevel: false,
       percentToNextLevel: 50.1219521 } ],
  inventory:
   { buckets: { Invisible: [], Item: [], Currency: [] },
     currencies: [ [Object] ] },
  grimoireScore: 85 }
```

#### Spec

As per defined in [`endpoints.js`](https://github.com/waltfy/destiny/blob/develop/src/endpoints.js).

`{ name: 'Account', url: '${ membershipType }/Account/${ membershipId }', required: ['membershipType', 'membershipId'] },`

* * *

### `Destiny::Character(params)`

> Returns an `Object` with details about a character.

`params` (`Object`)
  - `membershipType` - `Number`
  - `membershipId` - `String`, your membership id.
  - `characterId` - `String`, your character id.

#### Sample Usage:
```js
var destiny = require('./index')();

destiny
    .Character({
        membershipType: 1,
        membershipId: '4611686018439937004',
        characterId: '2305843009244228629'
    })
    .then(res => { /* deal with response */ })
    .catch(err => { /* handle error */ });
```

#### Sample Response:
```js
{ characterBase:
   { membershipId: '4611686018439937004',
     membershipType: 1,
     characterId: '2305843009244228629',
     dateLastPlayed: '2015-05-24T14:31:37Z',
     minutesPlayedThisSession: '87',
     minutesPlayedTotal: '6130',
     powerLevel: 32,
     raceHash: 2803282938,
     genderHash: 3111576190,
     classHash: 2271682572,
     currentActivityHash: 0,
     lastCompletedStoryHash: 0,
     stats:
      { STAT_DEFENSE: [Object],
        STAT_INTELLECT: [Object],
        STAT_DISCIPLINE: [Object],
        STAT_STRENGTH: [Object],
        STAT_LIGHT: [Object],
        STAT_ARMOR: [Object],
        STAT_AGILITY: [Object],
        STAT_RECOVERY: [Object],
        STAT_OPTICS: [Object] },
     customization:
      { personality: 2166136261,
        face: 820889531,
        skinColor: 2542514575,
        lipColor: 1328348389,
        eyeColor: 1511637748,
        hairColor: 2001723931,
        featureColor: 2166136261,
        decalColor: 233897108,
        wearHelmet: false,
        hairIndex: 10,
        featureIndex: 0,
        decalIndex: 0 },
     grimoireScore: 2100,
     peerView: { equipment: [Object] },
     genderType: 0,
     classType: 2,
     buildStatGroupHash: 1997970403 },
  levelProgression:
   { dailyProgress: 4032,
     weeklyProgress: 196282,
     currentProgress: 1091453,
     level: 13,
     step: 0,
     progressToNextLevel: 51453,
     nextLevelAt: 80000,
     progressionHash: 2030054750 },
  emblemPath: '/common/destiny_content/icons/a9ac444de02308d1410af8a0c201d177.jpg',
  backgroundPath: '/common/destiny_content/icons/ee90656ee23ceabf4fe6c4b34234d3ca.jpg',
  emblemHash: 3656150982,
  characterLevel: 32,
  baseCharacterLevel: 20,
  isPrestigeLevel: true,
  percentToNextLevel: 25 }
```

#### Spec

As per defined in [`endpoints.js`](https://github.com/waltfy/destiny/blob/develop/src/endpoints.js).

`{ name: 'Character', url: '${ membershipType }/Account/${ membershipId }/Character/${ characterId }/', required: ['membershipType', 'membershipId', 'characterId'] }`

### `Destiny::Activities(params)`

> Returns an `Object` with details about a character's activities.

`params` (`Object`)
  - `membershipType` - `Number`
  - `membershipId` - `String`, your membership id.
  - `characterId` - `String`, your character id.

#### Sample Usage:
```js
var destiny = require('./index')();

destiny
    .Character({
        membershipType: 1,
        membershipId: '4611686018439937004',
        characterId: '2305843009244228629'
    })
    .then(res => { /* deal with response */ })
    .catch(err => { /* handle error */ });
```

#### Spec

As per defined in [`endpoints.js`](https://github.com/waltfy/destiny/blob/develop/src/endpoints.js).

`{ name: 'Activities', url: '${ membershipType }/Account/${ membershipId }/Character/${ characterId }/Activities', required: ['membershipType', 'membershipId', 'characterId'] }`

* * *

### `Destiny::Inventory(params)`

> Returns an `Object` with details about character's inventory.

`params` (`Object`)
  - `membershipType` - `Number`
  - `membershipId` - `String`, your membership id.
  - `characterId` - `String`, your character id.

#### Sample Usage:
```js
var destiny = require('./index')();

destiny
    .Inventory({
        membershipType: 1,
        membershipId: '4611686018439937004',
        characterId: '2305843009244228629'
    })
    .then(res => { /* deal with response */ })
    .catch(err => { /* handle error */ });
```

#### Spec

As per defined in [`endpoints.js`](https://github.com/waltfy/destiny/blob/develop/src/endpoints.js).

`{ name: 'Inventory', url: '${ membershipType }/Account/${ membershipId }/Character/${ characterId }/Inventory', required: ['membershipType', 'membershipId', 'characterId'] }`

* * *

### `Destiny::Progression(params)`

> Returns an `Object` with details about character's progression.

`params` (`Object`)
  - `membershipType` - `Number`
  - `membershipId` - `String`, your membership id.
  - `characterId` - `String`, your character id.

#### Sample Usage:
```js
var destiny = require('./index')();

destiny
    .Inventory({
        membershipType: 1,
        membershipId: '4611686018439937004',
        characterId: '2305843009244228629'
    })
    .then(res => { /* deal with response */ })
    .catch(err => { /* handle error */ });
```

#### Spec

As per defined in [`endpoints.js`](https://github.com/waltfy/destiny/blob/develop/src/endpoints.js).

`{ name: 'Progression', url: '${ membershipType }/Account/${ membershipId }/Character/${ characterId }/Progression', required: ['membershipType', 'membershipId', 'characterId'] }`

* * *

### `Destiny::Equip(params, headers)` – **COOKIES REQUIRED**

> Equips an item onto a character

- `params` (`Object`)
  - `membershipType` - `Number`
  - `characterId` - `String`, your character id.
  - `itemId` - `String`, id of item to be equipped.
- `headers` - `Object`, used for authentication.
  - `'Cookie'` - `String`, provided by Bungie.
  - `'x-api-key'` - `String`, provided by Bungie.
  - `'x-csrf'` - `String`, provided by Bungie.

#### Sample Usage:
```js
var destiny = require('./index')();

var AUTH = {
  'Cookie': '{{ cookie }}',
  'x-api-key': '{{ your api key}}',
  'x-csrf': '{{ your csrf token }}'
};

destiny
    .Equip({
        characterId: '2305843009244228629',
        itemId: '6917529049882199897',
        membershipType: 1
    }, AUTH)
    .then(res => { /* deal with response */ })
    .catch(err => { /* handle error */ });
```

#### Spec

As per defined in [`endpoints.js`](https://github.com/waltfy/destiny/blob/develop/src/endpoints.js).

`{ name: 'Equip', url: 'EquipItem', required: ['characterId', 'itemId', 'membershipType'] }`

* * *

### `Destiny::TransferItem(params, headers)` – **COOKIES REQUIRED**

> Transfers an item from a char's inventory to the vault.

- `params` (`Object`)
  - `membershipType` - `Number`
  - `characterId` - `String`, your character id.
  - `itemId` - `String`, id of item to be equipped.
  - `itemReferenceHash` - `Number`
  - `stackSize` - `Number`, number of items to move, 1 for weapons and armour.
  - `transferToVault` - `Boolean`, `true` to send to the vault, and `false` to pull from it.
- `headers` - `Object`, used for authentication.
  - `'Cookie'` - `String`, provided by Bungie.
  - `'x-api-key'` - `String`, provided by Bungie.
  - `'x-csrf'` - `String`, provided by Bungie.

#### Sample Usage:
```js
var destiny = require('./index')();

var AUTH = {
  'Cookie': '{{ cookie }}',
  'x-api-key': '{{ your api key}}',
  'x-csrf': '{{ your csrf token }}'
};

destiny
    .TransferItem({
        characterId: '2305843009244228629',
        itemId: '6917529037157880001',
        itemReferenceHash: 1683638659,
        membershipType: 1,
        stackSize: 1,
        transferToVault: true
    }, AUTH)
    .then(res => { /* deal with response */ })
    .catch(err => { /* handle error */ });
```

#### Spec

As per defined in [`endpoints.js`](https://github.com/waltfy/destiny/blob/develop/src/endpoints.js).

`{ name: 'TransferItem', url: 'TransferItem', required: ['characterId', 'itemId', 'itemReferenceHash', 'membershipType'] }`

## Change Log

- `v.0.4.1` - 24/05/2015 - Breaking changes.
  * Rewrite in ES6
  * Cleaned up various bits code
  * Addition of more end points, including Authorized ones `(EquipItem, TransferItem)`
  * Moved build system to Webpack
  * Now using `isomorphic-fetch`
  * Added pre-commit hooks to ensure builds for both Node and Web are committed before pushing
  * Removed old CONFIG file
  * Improved overall architecture of the library
  * Added linting 
- `v.0.3.2` - **NOTE:** If you depended on this version make sure you explicit define it on your `package.json`.

## License

The MIT License (MIT)

Copyright (c) 2014-2015 Walter Carvalho

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
