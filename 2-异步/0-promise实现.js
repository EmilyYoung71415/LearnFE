/****
 * promise
 * 本质: 将信息发送者 和 信息接受者 都绑定在了一个对象里
 */
// base版
// new Promise(resolve => {
//         setTimeout(() => {
//             resolve(1)
//         }, 500)
//     })
//     .then(res => {
//         console.log(res)
//         return new Promise(resolve => {
//             setTimeout(() => {
//                 resolve(2)
//             }, 500)
//         })
//     })
//     .then(console.log)
// 500ms后输出1， 又500ms后输出2


// base版： 调用resolve 并在.then实现得值
/****
 * 实现思路:
 *          1. new Promise new 传入的函数 excutor 立即得到调用
 *          2. excutor里的 resolve、reject调用后 promise状态得到改变
 *          3. .then注册回调，一旦excutor里的resolve得到调用, .then里的回调函数也会被调用，并得到异步结果值
 *          4. promise支持链式调用 .then后还可以.then
 */

var _Promise = function (excutor) {
    var self =  this;
    this.onResolveCallback = [];
    this.data = null;
    this.status = 'pending';

    function resolve(value) {
        setTimeout(function () {
            if (self.status === 'pending') {
                self.data = value;
                self.status = 'resolved';
                self.onResolveCallback.forEach(cb => cb(value));
            }
        });
    }

    excutor(resolve);
};

_Promise.prototype.then = function (onResolve) {
    var self = this;
    return new _Promise(function (resolve) {
        self.onResolveCallback.push(function () {
            var result = onResolve(self.data);

            if (result instanceof _Promise) {
                result.then(resolve);
            }
            else {
                resolve(result);
            }
        });
    });
};


// new _Promise(resolve => {
//         setTimeout(() => {
//             resolve(1);
//             resolve(4);
//         }, 500);
//     })
//     .then(res => {
//         console.log(res);
//         return new _Promise(resolve => {
//             setTimeout(() => {
//                 resolve(2);
//             }, 500);
//         })
//     })
//     .then(console.log);