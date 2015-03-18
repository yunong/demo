var restify = require('restify');

var server = restify.createServer({});

server.use(restify.queryParser());

server.get(
    '/hello',
    function hello(req, res, next) {
        res.send({hi: req.query.name});
        return next();
    }
);

server.listen(1337, function () {
    console.log('server started');
});
