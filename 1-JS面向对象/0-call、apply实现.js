/**
 * Function.prototype.call()
 *       语法：function.call(thisArg, arg1, arg2, ...)
 *            1.执行func函数，传入参数arg1, arg2, ...
 *            2.传入thisArg，强制func函数在调用时this绑定为thisArg
 * 
 * Function.prototype.apply() 区别apply接受的是参数数组
 */
// demo 1:
// var Asian = {
//     skin: 'yellow'
// };
// function Chinese() {
//     console.log(this.skin);
// }
// Chinese.call(Asian); // yellow



/****
 * 实现原理:
 *      Asian.fn = Chinese
 *      Asian.fn();
 *      delete Asian.fn
 * 在此基础上需要解决的问题：
 *      1、函数参数
 *      2、thisArg 参数可以传 null，当为 null 的时候，视为指向 window
 *      3、当执行的函数fn()有返回值时，call方法调用后也得有返回值
 */

Function.prototype._call = function (ctx) {
    ctx.fn = this;
    ctx.fn();
    var args = [];
    for (var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
    }

    // 使用eval将拼接的字符当作js执行：ctx.fn(arguments[1], arguments[2], ...);
    var result = eval('context.fn(' + args + ')');

    delete ctx.fn;
    return result;
};


// apply 同理 只是参数不一样
Function.prototype._apply = function (ctx, arr) {
    ctx.fn = this;

    var result;
    if (!arr) {
        result = ctx.fn();
    }
    else {
        var args = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            args.push('arr[' + i + ']');
        }
        result = eval('context.fn(' + args + ')');
    }

    delete ctx.fn;
    return result;
}