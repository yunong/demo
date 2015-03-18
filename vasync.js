var vasync = require('vasync');

var results = vasync.pipeline({funcs: [
    function one(_, cb) {
        console.log('some async function one');
        return cb();
    },
    function two(_, cb) {
        console.log('some async function two');
        return cb();
    },
    function three(_, cb) {
        console.log('some async function three');
        // No cb due to bug
        // return cb();
    }
], args: {}}, function cb(err, res) {
    console.log('finished pipeline', err, res);
});

setInterval(function() { console.log('pipeline status', results); }, 1000);

























