/****
 * 代码合在一起方便调试版
 */

class Dep {
    constructor(key) {
        this.key = key;
        this.deps = new Set();
    }

    depend() {
        if (Dep.target) {
            this.deps.add(Dep.target);
        }
    }

    notify() {
        this.deps.forEach(watcher => watcher.update())
    }
}

Dep.target = null;
const targetStack = [];

function pushTarget(_target) {
    if (Dep.target) targetStack.push(Dep.target);
    Dep.target = _target;
}

function popTarget() {
    Dep.target = targetStack.pop()
}


class Watcher {
    constructor(getter, options = {}) {
        const {
            computed,
            watch,
            callback
        } = options;
        this.getter = getter;
        this.computed = computed;
        this.watch = watch;
        this.callback = callback;
        this.value = undefined;
        if (computed) {
            this.dep = new Dep();
        } else {
            this.get();
        }
    }

    get() {
        pushTarget(this);
        this.value = this.getter();
        popTarget();
        return this.value;
    }

    // 仅为computed使用
    depend() {
        // watcher(()=> cdata.value) => computedWatcher.depend()

        // 添加了 页面watcher？ 还是 自己 
        this.dep.depend();
    }

    update() {
        if (this.computed) {
            this.get();
            this.dep.notify();
        } else if (this.watch) {
            const oldValue = this.value;
            this.get();
            this.callback(oldValue, this.value);
        } else {
            this.get();
        }
    }
}


function reactive(data) {
    if (isObject(data)) {
        Object.keys(data).forEach(key => {
            defineReactive(data, key)
        })
    }
    return data;

    function defineReactive(data, key) {
        let val = data[key]
        const dep = new Dep()
    
        Object.defineProperty(data, key, {
            get() {
                dep.depend()
                return val
            },
            set(newVal) {
                val = newVal
                dep.notify()
            }
        })
    
        if (isObject(val)) {
            reactive(val)
        }
    }

    function isObject(val) {
        return val !== null && typeof val === 'object';
    }
}


function computed(getter) {
    let def = {}
    // 2、把自身computedWatcher设置为 全局Dep.target，然后开始求值：
    const computedWatcher = new Watcher(getter, {
        computed: true
    })
    Object.defineProperty(def, 'value', {
        get() {
            computedWatcher.depend()
            return computedWatcher.get()
        }
    })
    return def;
}


function watch(getter, callback) {
    new Watcher(getter, { watch: true, callback })
}

/****
 * demo
 */

const data = reactive({
    number: 1
})

const numberPlusOne = computed(() => {
    return data.number + 1
})

new Watcher(() => {
    document.getElementById('app2').innerHTML = `
        ${numberPlusOne.value}
    `
});

watch(
    () => data.msg,
    (old, newVal) => {
        console.log('old: ', old)
        console.log('newVal: ', newVal)
    }
);

data.number = 233;