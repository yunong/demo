var bunyan = require('bunyan');

var log = bunyan.createLogger({
    name: 'demo',
    level: bunyan.INFO
});

log.info('hello world');

