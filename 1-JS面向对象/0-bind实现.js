/*****
 * Function.prototype.bind()
 *          function.bind(thisArg[, arg1[, arg2[, ...]]])
 *          1. 给调用函数的this强制绑定为thisArg
 *          2. 返回新的函数，不直接执行函数，手动调用新函数
 *          3. 传入参数
 */
// demo1
// var Asian = {
//     skin: 'yellow'
// };
// function Chinese() {
//     console.log(this.skin);
// }
// // 返回了一个函数
// var newFunc = Chinese.bind(Asian); 
// newFunc(); // yellow

Function.prototype._bind = function (context) {

    if (typeof this !== "function") {
        throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fNOP = function () {};

    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
    };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
}