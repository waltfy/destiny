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

Note that if you wish, you may override the default host (`https://bungie.net/`) with your own. i.e. If you have a proxy server to handle your requests. See [proxy-server](#proxy-server) instructions above.

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

## API Overview

**NOTE:** In all requests `membershipType` is a `Number` representing the account type, or what network you are in. The network types are:
* `1`: XBox Live.
* `2`: PlayStation Network (PSN).

**NOTE:** In order to get the definitions from Bungie (more detail, and more data) pass in `{ definitions: true }` in the optional parameter `query`.


### `Destiny::Search(params)`

> Returns an `Array` of accounts.

params (`Object`)

  - 'membershipType' - `Number`
  - 'name' - `String`, the name of your account

#### Sample Usage:
```js
var destiny = require('./index')();

destiny
    .Search({
        membershipType: 1,
        name: 'waltercarvalho'
    })
    .then(function (res) {
        console.log('res:', res);
    })
    .catch(function (err) {
        console.log(err.stack);
    });
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

`{ name: 'Search', url: 'SearchDestinyPlayer/${ membershipType }/${ name }/', required: ['membershipType', 'name'] }`


### `Destiny::Account(params)`

- endpoints.js: `{ name: 'Account', url: '${ membershipType }/Account/${ membershipId }', required: ['membershipType', 'membershipId'] },`

### `Destiny::Character(params)`

- endpoints.js: `{ name: 'Character', url: '${ membershipType }/Account/${ membershipId }/Character/${ characterId }/', required: ['membershipType', 'membershipId', 'characterId'] }`

### `Destiny::Activities(params)`

- endpoints.js: `{ name: 'Activities', url: '${ membershipType }/Account/${ membershipId }/Character/${ characterId }/Activities', required: ['membershipType', 'membershipId', 'characterId'] }`

### `Destiny::Inventory(params)`

- endpoints.js: `{ name: 'Inventory', url: '${ membershipType }/Account/${ membershipId }/Character/${ characterId }/Inventory', required: ['membershipType', 'membershipId', 'characterId'] }`

### `Destiny::Progression(params)`

- endpoints.js: `{ name: 'Progression', url: '${ membershipType }/Account/${ membershipId }/Character/${ characterId }/Progression', required: ['membershipType', 'membershipId', 'characterId'] }`

### `Destiny::Equip(params, headers)`

- endpoints.js: `{ name: 'Equip', url: 'EquipItem', required: ['characterId', 'itemId', 'membershipType'] }`

### `Destiny::TransferItem(params, headers)`

- endpoints.js: `{ name: 'TransferItem', url: 'TransferItem', required: ['characterId', 'itemId', 'itemReferenceHash', 'membershipType'] }`


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
