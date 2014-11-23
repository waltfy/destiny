var Destiny = require('./lib/destiny');
console.log('Destiny:', Destiny);

Destiny
  .search({ type: 1, name: 'tomphuu' })
  .then(function (result) {
    console.log('result:', result);
  });
