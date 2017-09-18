const mongoose = require('mongoose');
const dbUrl = ('mongodb://osp:open123456@ds135444.mlab.com:35444/opensponsorship');

mongoose.connect(dbUrl, {useMongoClient: true});

mongoose.connection.on('connected', function() {
  console.log('DB CONNECTED')
});
mongoose.connection.on('error', function (err) {
  console.log("THERE WAS AN ERROR CONNECTING TO DB", err)
});

module.exports = mongoose;
