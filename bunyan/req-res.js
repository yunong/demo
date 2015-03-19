var bunyan = require('bunyan');

var log = bunyan.createLogger({
    name: 'demo',
    level: bunyan.INFO
});

var req = {
    method: 'GET',
    url: '/hello'
};

var res = {
    statusCode: 200,
    latency: 1000
};

log.info('%s %s %s %s', req.method, req.url, res.statusCode, res.latency);
log.info({request: req, response: res}, 'handled request');
