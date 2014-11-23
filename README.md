Destiny
====

> A tiny client for interacting with Bungie's Destiny API.

# API

```js
Destiny
  .search({ type: 1, name: 'tomphuu' })
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
