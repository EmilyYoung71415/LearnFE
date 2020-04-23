class Dep {
    constructor(key) {
        this.key = key;
        this.deps = new Set();
    }
    // data.getter触发的时候调用
    depend() {
        if (Dep.target) {
            this.deps.add(Dep.target);
        }
    }
    // data.setter触发时调用
    notify() {
        this.deps.forEach(watcher => watcher.update());
    }
}

Dep.target = null; // 全局变量，watcher 通过这个全局变量 建立与watcher联系
const targetStack = []; // Dep.target的修改通过：pushTarget\popTarget 两个方法 export给外界， watcher调用

function pushTarget(target) {
    Dep.target && targetStack.push(Dep.target);
    Dep.target = target;
}

function popTarget() {
    Dep.target = targetStack.pop();
}

module.exports = {
    Dep,
    pushTarget,
    popTarget
}