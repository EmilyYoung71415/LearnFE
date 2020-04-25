const Watcher = require('./watcher');

function computed(getter) {
    let def = {};
    const computedWatcher = new Watcher(getter, {computed: true});
    Object.defineProperty(def, 'value', {
        get() {
            computedWatcher.cDepend();
            return computedWatcher.get();
        }
    });
    return def;
}

module.exports = computed;