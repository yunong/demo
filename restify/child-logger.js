var bunyan = require('bunyan');
var restify = require('restify');

var LOG = bunyan.createLogger({
    name: 'demo',
    level: bunyan.INFO
});

var server = restify.createServer({
    log: LOG.child({
        component: 'server',
        level: bunyan.INFO,
        streams: [{
            // This ensures that if we get a WARN or above all debug records
            // related to that request are spewed to stderr - makes it nice
            // filter out debug messages in prod, but still dump on user
            // errors so you can debug problems
            level: bunyan.DEBUG,
            type: 'raw',
            stream: new restify.bunyan.RequestCaptureStream({
                level: bunyan.WARN,
                maxRecords: 100,
                maxRequestIds: 1000,
                stream: process.stderr
            })
        }],
        serializers: bunyan.stdSerializers
    })
});

server.use(restify.queryParser());
server.use(restify.requestLogger());

server.on('after', restify.auditLogger({
    log: LOG.child({
        component: 'audit'
    })
}));

server.get(
    '/hello',
    function authenticate(req, res, next) {
        res.header('req_id', req.id());
        var someHugeAuthenticatedBlob = {
            key: 'pretend this is a really large object'
        };

        req.log.debug({
            authBlob: someHugeAuthenticatedBlob
        }, 'hello.authenticate: entering');

        if (Math.random() > parseFloat('0.5', 10)) {
            req.log.warn('authentication failed');
            return next(new restify.InvalidCredentialsError('auth failed'));
        }

        return next();
    },
    function hello(req, res, next) {
        req.log.info({params: req.query}, 'hello: entering');
        res.header('req_id', req.id());
        res.send({hi: req.query.name});
        return next();
    }
);

server.listen(1337, function () {
    LOG.info({url: server.url}, 'server started');
});
