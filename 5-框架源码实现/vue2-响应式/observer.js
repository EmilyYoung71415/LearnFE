// import Dep from './dep';
const {Dep} = require('./dep');
const isObject = val => (val !== undefined && typeof val === 'object');
// 将对象定义为响应式
function observer(data) {
    if (isObject(data)) {
        Object.keys(data).forEach(key => {
            observerCall(data, key);
        });
    }
    return data;
}

function observerCall(data, key) {
    let val = data[key];
    const dep = new Dep();

    Object.defineProperty(data, key, {
        get() {
            // data每个属性的dep 收集当前计算watcher作为依赖
            dep.depend();
            return val;
        },
        set(newVal) {
            val = newVal;
            dep.notify();
        }
    });

    if (isObject(val)) {
        observer(val);
    }
}

module.exports = observer;