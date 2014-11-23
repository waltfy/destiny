Destiny
====

> A tiny client for interacting with Bungie's Destiny API.

# API
### `search({ type: Number, name: String, query: Object })`
* type: 1 - XBOX Live, 2 - PS
* name: Your Bungie Account Name
* query: An object used to create a query string.


```js
Destiny
  .search({ type: 1, name: 'waltercarvalho' })
  .then(function (data) {
    data = JSON.parse(data);
    var id = data.Response[0].membershipId;
    var type = data.Response[0].membershipType;
    return Destiny.account({ id: id, type: type });
  })
  .then(function (data) {
    // do stuff
  });
```
