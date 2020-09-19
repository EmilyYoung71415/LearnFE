/****************************************************************
 * 1. try catch只能接住符合条件的error
 *      在报错的时候，线程执行已经进入 try catch 代码块，且处在 try catch 里面
 * 
 * 2. promise捕获错误：
 *      1.最佳实践：无需在promise外部 套try...catch，直接使用.catch接住错误
 *      2.promise也不能接住异步的通过throw出的错，所以当promise内部包含三方库函数的时 三分库在异步错误的时千万别使用throw，这样外界找不到
 *        使用throw 代替reject
 *      3.promise链传递错误，那么.then里的异步函数必须使用return 异步函数 来传递更新当前层的错误
 */
// 1. try catch只能接住符合条件的error
try {
    a.
} catch (e) {
    console.log("error", e); // 编译时的错误
} 
// outputUncaught SyntaxError: Unexpected token '}'

try {
    setTimeout(() => {
        console.log(a.b); //# 异步代码 错误发生在未来
    }, 100)
} catch (e) {
    console.log('error', e);
}
console.log(111); 
//output111Uncaught ReferenceError: a is not defined




// 2. promise捕获错误：
    // 2.2 错误在未来
function fetch(callback) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
             throw Error('用户不存在')
        })
    })
}

fetch().then(result => {
    console.log('请求处理', result) // 永远不会执行
}).catch(error => {
    console.log('请求处理异常', error) // 永远不会执行
})

// 程序崩溃
// Uncaught Error: 用户不存在


    // 2.3 return传递错误
promiseF.then(result => {
    return Promise.reject('error1') // # promise在链中rejected，错误会被链的catch接住，
                                    // # 期间的所有.then正常的回调都会被忽略
}).then(result => {// # 穿透
    console.log(result) // 永远不会执行
    return Promise.resolve('ok1') // 永远不会执行
}).then(result => {// # 穿透
    console.log(result) // 永远不会执行
}).catch(error => {// # 被接住
    console.log(error) // error1
})

    // 2.2 通过throw 捕获的错误
Promise.resolve(true).then((resolve, reject)=> {
    throw Error('microtask 中的异常')
}).catch(error => {
    console.log('捕获异常', error) // 捕获异常 Error: microtask 中的异常
})