var destiny = require('./index')();

destiny
  .Search({
    membershipType: 1,
    name: 'waltercarvalho'
  })
  .then(function (res) {
    console.log('res:', res);
  })
