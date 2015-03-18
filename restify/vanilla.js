var bunyan = require('bunyan');
var restify = require('restify');

var LOG = bunyan.createLogger({
    name: 'demo',
    level: bunyan.INFO
});

var server = restify.createServer({
    log: LOG.child({
        component: 'server',
        level: bunyan.INFO
    })
});

server.use(restify.queryParser());

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
