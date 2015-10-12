var destiny = require('./index')(process.env.BUNGIE_API_KEY);

destiny
  .Search(
        {
            membershipType: 1,
            name: 'waltercarvalho'
        }
    )
    .then(function (res) {
        console.log('res:', res);
    })
    .catch(function (err) {
        console.log('err.stack: ', err.stack); // TODO: Remove this comment.
    });
