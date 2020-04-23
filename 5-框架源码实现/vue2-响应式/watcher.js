// import Dep, {  } from './dep';
const {Dep, pushTarget, popTarget} = require('./dep');

class Watcher {
    constructor(getter) {
        this.value = null;
        this.getter = getter;
        this.get();
    }
    get() {
        pushTarget(this);
        this.value = this.getter(); // 调用渲染函数 浏览器执行到data.xxx的读取时 触发拦截getter
        popTarget();
        return this.value;
    }
    update() {
        this.get();
    }
}

module.exports = Watcher;