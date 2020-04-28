const Watcher = require('./watcher');

module.exports = function watch(getter, cb) {
    new Watcher(getter, {
        watch: true,
        watchCallback: cb
    });
};