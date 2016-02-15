var express = require('express');
var path = require('path');

var app = express();
var router = express.Router();


router.get('/', function (req, res, next) {
  res.sendFile('index.html', { root: path.join(__dirname, './views') });
});

app.use('/', router);
app.use(express.static('app'));


module.exports = app;
