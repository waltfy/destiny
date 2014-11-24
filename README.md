Destiny-Client
====
[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/waltfy/destiny?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A simple client for interacting with Bungie's Destiny API.

I hope to implement more and more end-points as time allows. Check list below: 
```
  http://www.bungie.net/platform/Destiny/Manifest/
  http://www.bungie.net/platform/Destiny/Manifest/[i]/[j]/
  http://www.bungie.net/platform/Destiny/SearchDestinyPlayer/[d]/[e]/
  http://www.bungie.net/platform/Destiny/[membershipType]/Account/[accountId]/
  http://www.bungie.net/platform/Destiny/[e]/Account/[d]/Character/[g]/
  http://www.bungie.net/platform/Destiny/[membershipType]/Account/[accountId]/Character/[characterId]/Complete/
  http://www.bungie.net/platform/Destiny/[membershipType]/Account/[d]/Character/[g]/Inventory/
  http://www.bungie.net/platform/Destiny/[membershipType]/Account/[d]/Character/[h]/Inventory/[e]/
  http://www.bungie.net/platform/Destiny/[membershipType]/Account/[d]/Character/[g]/Activities/
  http://www.bungie.net/platform/Destiny/[membershipType]/Account/[d]/Character/[g]/Progression/
  http://www.bungie.net/platform/Destiny/[membershipType]/MyAccount/Character/[characterId]/Vendors/
  http://www.bungie.net/platform/Destiny/[membershipType]/MyAccount/Character/[characterId]/Vendors/Summaries/
  http://www.bungie.net/platform/Destiny/[membershipType]/MyAccount/Character/[characterId]/Vendor/[g]/
  http://www.bungie.net/platform/Destiny/[d]/MyAccount/Character/[f]/Advisors/
  http://www.bungie.net/platform/Destiny/EquipItem/
  http://www.bungie.net/platform/Destiny/Stats/Definition/
  http://www.bungie.net/platform/Destiny/Stats/[e]/[d]/[f]/
  http://www.bungie.net/platform/Destiny/Stats/ActivityHistory/[f]/[e]/[g]/
  http://www.bungie.net/platform/Destiny/Stats/UniqueWeapons/[f]/[d]/[g]/
  http://www.bungie.net/platform/Destiny/Stats/Leaderboards/[e]/[d]/
  http://www.bungie.net/platform/Destiny/Stats/LeaderboardsForPsn/
  http://www.bungie.net/platform/Destiny/Stats/Leaderboards/[e]/[d]/[f]/
  http://www.bungie.net/platform/Destiny/Stats/PostGameCarnageReport/[e]/
  http://www.bungie.net/platform/Destiny/Stats/AggregateActivityStats/[f]/[e]/[g]/
  http://www.bungie.net/platform/Destiny/[d]/Stats/GetMembershipIdByDisplayName/[e]/
  http://www.bungie.net/platform/Destiny/Vanguard/Grimoire/[d]/
  http://www.bungie.net/platform/Destiny/Vanguard/Grimoire/[d]/[e]/
  http://www.bungie.net/platform/Destiny/Vanguard/Grimoire/Definition/
```

Please feel free submit issues and requests.

## Usage

```js
Destiny
  .search({ type: 1, name: 'waltercarvalho' })
  .end(function (err, res) {
    // do stuff
  });
```

## Getting Started

### proxy server:

Unfortunately you cannot hit `https://bungie.net` directly. So if you plan to use this library in client-side code, due to `CORS` you'll have to run your own proxy server to handle your requests to Bungie for you. I have added an example proxy server ([`proxy.js`](https://github.com/waltfy/destiny/blob/develop/proxy.js)). Simply run `node proxy.js`. Credit to [@phuu](https://github.com/phuu).

### node:

`$ npm install destiny-client`

Note that if you wish, you may override the default host (`https://bungie.net/`) with your own. i.e. If you have a proxy server to handle your requests. See [proxy-server](#proxy-server) instructions above.

```js
var Destiny = require('destiny-client')(/* { host: 'http://localhost:9000' } */);
```

### web:

Simply include `desiny.js` or `destiny.min.js` on your page. You will most likely need a proxy server due to `CORS`. See [proxy-server](#proxy-server) instructions above.

```html
<script src='destiny.min.js' type='text/javascript'></script>
<script type="text/javascript">
  var client = Destiny(/* { host: 'http://localhost:9000' } */);
  client
    .search({ type: 2, 'yourusername' })
    .end(function (err, res) { /* do stuff */ });
</script>
```

## API Overview

In all requests `type` is a `Number` representing the account type, or what network you are in. The network types are:
* `1`: XBox Live.
* `2`: PlayStation Network (PSN).

**NOTE:** In order to get the definitions from Bungie (more detail, and more data) pass in `{ definitions: true }` in the optional parameter `query`.

### Search Player

* **`Destiny.search({ type: Number, name: String[, query: Object] })`**
  * `type`: Network type.
  * `name`: Your Bungie name.
  * `query`: An object used to create a query string.

### Account

* **`Destiny.account({ type: Number, id: String[, query: Object] })`**
  * `type`: Network type.
  * `id`: Your Bungie membership id. If you don't know this use `Destiny.search`.
  * `query`: An object used to create a query string.

### Character (Inventory, Activities, Progression)

* **`Destiny.character.inventory({ type: Number, membership: String, id: String[, query: Object] })`**
  * `type`: Network type.
  * `membership`: Your Bungie membership id. If you don't know this use `Destiny.search`.
  * `id`: A destiny Character id.
  * `query`: An object used to create a query string.

* **`Destiny.character.activities({ type: Number, membership: String, id: String[, query: Object] })`**
  * `type`: Network type.
  * `membership`: Your Bungie membership id. If you don't know this use `Destiny.search`.
  * `id`: A destiny Character id.
  * `query`: An object used to create a query string.

* **`Destiny.character.progression({ type: Number, membership: String, id: String[, query: Object] })`**
  * `type`: Network type.
  * `membership`: Your Bungie membership id. If you don't know this use `Destiny.search`.
  * `id`: A destiny Character id.
  * `query`: An object used to create a query string.


## License

The MIT License (MIT)

Copyright (c) 2014 Walter Carvalho

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
