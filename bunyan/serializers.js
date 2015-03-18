var bunyan = require('bunyan');
var fs = require('fs');

var log = bunyan.createLogger({
    name: 'demo',
    level: bunyan.INFO,
    serializers: {
        authInfo: function(params) {
            return {
                username: params.username,
                password: 'xxxxxx'
            };
        }
    }
});

var authInfo  = {
    username: 'yunong',
    password: 'password'
};

log.info({authInfo: authInfo}, 'got request');
