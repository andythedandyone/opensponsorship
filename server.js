const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./server/routes/index');
const mong = require('./server/models/databaseSetup');
var redirect = 0;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist')));

//  API end point
app.use('/api', api);

//  Error handling, rough snippet, add http headers for reload
//  after 5 tries and every 5 seconds
app.get('*', function(req, res, next) {
  // if (redirect > 5) {
  //   res.send('SERVER ERROR, TRY AGAIN LATER');
  //   setTimeout(function() {
  //     console.log('TRYING AGAIN');
  //     redirect = 0;
  //     res.redirect('/')
  //   }, 5000)
  // } else {
  //   redirect++;
  //   return res.redirect('/')
  // }
  console.log('SERVER ERROR, RESTART')
  res.sendStatus(404);
});

//  Create and Run Server
const port = process.env.PORT || 3000;
app.set(port, port);

var server = http.createServer(app);
server.listen(port, function() {
  console.log('Server Running on port ', port)
});
