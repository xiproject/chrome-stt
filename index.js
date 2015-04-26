var restify = require('restify');
var natural = require('natural');

var server = restify.createServer({
    name: 'chrome-stt-server'
});

server.use(restify.CORS());
server.use(restify.fullResponse());
server.use(restify.queryParser());

var xal = require('../../xal-javascript');

var lastSeenOutput = null;
var lastSeenOutputTime = new Date();

xal.on('xi.event.output.text', function(state, next) {
    var output = state.get('xi.event.output.text')[0].value;
    output = output.replace(/[^A-Za-z0-9 ]/, '');
    output = output.toLowerCase();
    lastSeenOutput = output;
    lastSeenOutputTime = new Date();
});

server.get('/', function(req, res, next) {
    var message = req.query.stt;
    res.send("STT Okay");
    message = message.replace(/\bp m\b/ig, 'pm');
    message = message.replace(/\ba m\b/ig, 'am');
    message = message.replace(/\bbm\b/ig, 'pm');
    message = message.replace(/\b(\d\d)(\d\d) (am|pm)\b/, "$1:$2 $3");
    message = message.trim();
    xal.log.debug("Received STT:", message);
    var distance = natural.JaroWinklerDistance(message, lastSeenOutput);
    xal.log.debug({JWD: distance});
    if (distance > 0.8) {
        xal.log.debug('Output echo suspected');
        return next();
    }
    xal.createEvent('xi.event.input.text', function(state, done) {
        state.put('xi.event.input.text', message);
        done(state);
    });
    next();
});

xal.start({name: 'chrome-stt'}, function() {
    server.listen(9876, function() {
        xal.log.info('Chrome-STT Server: Listening on port 9876');
    });
});
