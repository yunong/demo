var bunyan = require('bunyan');

var log = bunyan.createLogger({
    name: 'demo',
    level: bunyan.INFO,
});

log.info('hello world');

setInterval(function () {
    log.trace('should not see this in production');
}, 1000);
