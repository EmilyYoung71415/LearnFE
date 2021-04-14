/***
 * 防抖
 * 节流
 * 折半查找
 * deepclone
 * 
 * 
 * es5实现继承
 * call、bind
 * new
 * instanceof
 * 
 * 数组扁平化、对象扁平化
 * 
 * 
 * 异步并发数限制
 * 异步串行
 * 异步并行
 */

// 防抖： DT 未到时间点 清除定时器
function debounce(fn, timing) {
    let timer = null;
    return function (...args) {
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, timing);
    }
}

// 测试
const task = () => { console.log('run task') }
const debounceTask = debounce(task, 1000)
window.addEventListener('scroll', debounceTask)

// 节流：控制变量： 每次定时执行之后 变量为true, 达到稀释执行的作用
function throttle(fn, timing) {
    let hasRun = false;
    return function (...args) {
        if (hasRun) return;
        fn.apply(this, args);
        hasRun = true;
        setTimeout(() => {
            hasRun = false;
        }, timing);
    }
}

// 折半查找
function midSearch(arr, target) {
    return midSearchCall(arr, target, 0, arr.length-1);

    function midSearchCall(arr, target, start, end) {
        if (start > end) return -1;
        const mid = (start + end) >> 1;
        if (arr[mid] === target) return mid;
        else if (arr[mid] < target) return binarySearchCall(arr, target, mid + 1, end);
        return binarySearchCall(arr, target, start, mid - 1);
    }
}

// 迭代版本
function binarySearch(arr, target) {
    let start = 0;
    let end = arr.length - 1;

    while (start <= end) {
        let mid = (end + start) >> 1;
        if (arr[mid] === target) {
            return mid;
        }
        else if (arr[mid] < target) {
            start = mid + 1;
        }
        else {
            end = mid - 1;
        }
    }

    return -1;
}

// deepclone =  递归版的浅克隆
function deepClone(obj, map = new WeakMap()) {
    if (!obj instanceof Object) return obj; // null 等情况
    if (map.get(obj)) return map.get(obj);
    // TODO: 需要支持多个对象： 数组、date、函数
    const res = {};
    map.set(obj, res);
    Object.keys(obj).forEach((key) => {
        const curObj = obj[key];
        res[key] = curObj instanceof Object ? deepClone(curObj, map) : curObj;
    });
    return res;
}

function deepClone(obj, map = new WeakMap()) {
    if (!obj instanceof Object) return obj;
    if (map.get(obj)) return map.get(obj);

    // 特殊类型的处理
    // 函数
    if (typeof obj === 'function') {
        return function() {
            return obj.apply(this, arguments);
        }
    }
    
    // date
    if (obj instanceof Date) return new Date(obj);

    const res = Array.isArray(obj) ? [] : {};
    map.set(obj, res);
    Object.keys(obj).forEach((key) => {
        const curObj = obj[key];
        res[key] = curObj instanceof Object ? deepClone(curObj, map) : curObj;
    });
    return res;
}

// 数组扁平化、对象扁平化
function flatten(array) {
    return array.reduce((accurm, cur) =>
        Array.isArray(cur) ? accurm.concat(flatten(cur)) : accurm.concat(cur)
    , []);
}

function objectFlat(obj = {}) {
    const res = {};
    function flat(item, preKey = '') {
        Object.entries(item).forEach(([key, val]) => {
            const newKey = preKey ? `${preKey}.${key}` : key;
            if (val && typeof val === 'object') {
                flat(val, newKey);
            } else {
                res[newKey] = val;
            }
        })
    }
    flat(obj);
    return res
}
// 测试
const source = { a: { b: { c: 1, d: 2 }, e: 3 }, f: { g: 2 } };
console.log(objectFlat(source));


// es5实现继承
function Parent() {

}
  
function Child(options) {
    Parent.call(this, options);
}

function inherit(Child, Parent) {
    const f = function () {};
    f.prototype = Parent.prototype;
    Child.prototype = new f();
    Child.prototype.constructor = Child;
}

// call
Function.prototype._call = function(ctx, ...arg) {
    const key  = Symbol('key');
    ctx[key] = this;
    const res =  ctx[key](...arg);
    delete ctx[key];
    return res;
}

// fun2 = fun1.bind(this, name, age);
Function.prototype._bind = function(ctx, ...arg1) {
    const self = this; // func1 调用func1
    return function (...arg2) {
        return self.apply(ctx, ...arg1, ...arg2);
    }
}

// 异步并发限制
