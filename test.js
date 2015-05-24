var destiny = require('./index')();

console.log('Destiny:', Object.keys(destiny));

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
