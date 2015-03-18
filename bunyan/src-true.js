var bunyan = require('bunyan');
var fs = require('fs');

var log = bunyan.createLogger({
    name: 'demo',
    level: bunyan.INFO,
    src: true,
});

log.info('hello world');

