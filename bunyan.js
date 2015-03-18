var bunyan = require('bunyan');
var fs = require('fs');

var log = bunyan.createLogger({
    name: 'demo',
    level: bunyan.INFO,
    //src: true,
    serializers: bunyan.stdSerializers
    //serializers: {
        //params: function(params) {
            //return {
                //username: params.username,
                //password: 'xxxxxx'
            //};
        //}
    //}
});

//log.info('hello world');

//var req = {
    //method: 'GET',
    //url: '/hello'
//};

//var res = {
    //statusCode: 200,
    //latency: 1000
//};

//log.info('%s %s %s %s', req.method, req.url, res.statusCode, res.latency);
//log.info({request: req, response: res}, 'handled request');

//var params = {
    //username: 'yunong',
    //password: 'password'
//};

//log.info({params: params}, 'got request');
//fs.readFile('pathdoesnotexist', function (err) {
    //var myError  = new Error(err);
    //log.error({err: myError}, 'unable to read file');
//});

setInterval(function () {
    log.trace('should not see this in production');
}, 1000);
