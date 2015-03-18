var bunyan = require('bunyan');
var fs = require('fs');

var log = bunyan.createLogger({
    name: 'demo',
    level: bunyan.INFO,
    //serializers: bunyan.stdSerializers
});

fs.readFile('pathdoesnotexist', function (err) {
    var myError  = new Error(err);
    log.error({err: myError}, 'unable to read file');
});
