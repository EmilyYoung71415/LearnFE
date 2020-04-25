// import Dep, {  } from './dep';
const {Dep, pushTarget, popTarget} = require('./dep');

class Watcher {
    constructor(getter, option = {}) {
        const {computed} = option;
        this.value = null;
        this.getter = getter;
        this.computed = computed;
        this.computedDep = null;

        if (computed) {
            this.computedDep = new Dep();
        }
        else {
            this.get();
        }
    }
    get() {
        pushTarget(this);
        this.value = this.getter(); // 调用渲染函数 浏览器执行到data.xxx的读取时 触发拦截getter
        popTarget();
        return this.value;
    }
    // computed使用
    cDepend() {
        // 计算watcher收集当前的渲染watcher为依赖
        this.computedDep.depend();
    }
    update() {
        if (this.computed) {
            this.get();
            this.computedDep.notify();
        }
        else {
            this.get();
        }
    }
}

module.exports = Watcher;