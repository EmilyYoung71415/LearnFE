// 高阶函数，传入基于回调的异步，返回基于promise的异步
// loadScript('path/script.js', (err, script) => {...}) // 回调
// loadScriptPromise('path/script.js').then(...)// promise
// // 高阶函数   promisify
// let loadScriptPromise2 = promisify(loadScript);
// loadScriptPromise2(...).then(...);

function promisify(f) {
    return function (...args) { // 包装函数
        return new Promise((resolve, reject) => {
            // 重写原函数的回调
            function callback(err, ...result) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(...result);
                }
            }
            args.push(callback); // 传回原参数，使得f还可以callback跟踪结果，兼容写法
            f.call(this, ...args);
        });
    };
}