// module.exports = require('./lib/destiny');
var client = require('./lib/destiny')({ host: 'http://localhost:9000' });

client
  .main({ type: 1, membership: '4611686018439531850', id: "2305843009242314105" }).end()
  .then(function (res) {
    console.log(res.body);
  });
