var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var xal = require('../../xal-javascript');

xal.setName('chrome-stt');
xal.start();

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get('/', function(req, res) {
    var message = req.query['stt'];
    res.send("STT Okay");
    message = message.replace(/\bp m\b/ig, 'pm');
    message = message.replace(/\ba m\b/ig, 'am');
    message = message.replace(/\bbm\b/ig, 'pm');
    message = message.replace(/\b(\d\d)(\d\d) (am|pm)\b/, "$1:$2 $3");
    console.log("Recieved STT:", message);
    xal.postEvent({'xi.event': {input: {text: message}}});
});

app.listen(9876);
console.log('Chrome-STT Server: Listening on port 9876');
