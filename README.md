Destiny-Client
====

A simple client for interacting with Bungie's Destiny API.

## Usage

```js
Destiny
  .search({ type: 1, name: 'waltercarvalho' })
  .end(function (err, res) {
    // do stuff
  });
```

## Getting Started

node:

`$ npm install destiny-client`

Note that if you wish, you may override the default host (`https://bungie.net/`) with your own. i.e. If you have a proxy server to handle your requests.

```js
var Destiny = require('destiny-client')({ host:  });
```

## API Overview

**NOTE:** In order to get the definitions from Bungie (more detail, and more data) pass in `{ definitions: true }` in the optional parameter `query`.

### Search Player

* **`Destiny.search({ type: Number, name: String[, query: Object] })`**
  * `type`: 1 -> XBOX Live, 2 -> PSN
  * `name`: Your Bungie Name
  * `query`: An object used to create a query string.

### Account

* **`Destiny.account({ type: Number, id: String[, query: Object] })`**
  * `type`: 1 -> XBOX Live, 2 -> PSN
  * `id`: Your Bungie membership id. If you don't know this use `Destiny.search`.
  * `query`: An object used to create a query string.

### Character (Inventory, Activities, Progression)

* **`Destiny.character.inventory({ type: Number, membership: String, id: String[, query: Object] })`**
  * `type`: 1 -> XBOX Live, 2 -> PSN
  * `membership`: Your Bungie membership id. If you don't know this use `Destiny.search`.
  * `id`: A destiny Character id.
  * `query`: An object used to create a query string.

* **`Destiny.character.activities({ type: Number, membership: String, id: String[, query: Object] })`**
  * `type`: 1 -> XBOX Live, 2 -> PSN
  * `membership`: Your Bungie membership id. If you don't know this use `Destiny.search`.
  * `id`: A destiny Character id.
  * `query`: An object used to create a query string.

* **`Destiny.character.progression({ type: Number, membership: String, id: String[, query: Object] })`**
  * `type`: 1 -> XBOX Live, 2 -> PSN
  * `membership`: Your Bungie membership id. If you don't know this use `Destiny.search`.
  * `id`: A destiny Character id.
  * `query`: An object used to create a query string.
