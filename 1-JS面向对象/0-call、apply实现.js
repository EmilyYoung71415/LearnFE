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

// 核心思想: base 版
Function.prototype._call = function (ctx, ...arg) {
    ctx.fn = this; // this是函数调用者 希望借用方法的借用人
    let result = ctx.fn(...arg); // 参数数组展开 传入函数
    delete ctx.fn;
    return result;
}

/**
 * 遗漏的重要的case:
 * 1、ctx传入为null时，默认指向window
 * 2、...args 扩展符是es6才有的，需要想办法将数组转换为一个个的参数 传递给函数调用
 *      => var result = ctx.fn(args.join(',')); 这样展开不行
 *         因为join之后是一个字符串'1,2,3,4' 而不是fn(1,2,3,4)
 *         所以引入了eval 动态执行代码
 * 3、ctx上原本就有fn？
 */
//  完整版
Function.prototype.$call = function (ctx) {
    ctx = ctx || window;
    // var args = [].slice.call(arguments); // 其他参数 类数组转数组
    ctx.fn = this; // this是函数调用者 希望借用方法的借用人
    // let result = ctx.fn(...args); // 参数数组展开 传入函数

    var args = [];
    for (var i = 1; i < arguments.length; i++) {
        args.push(arguments[i]);
    }
    // context.fn(arguments[1], arguments[2], ...);
    // 在eval中，args 自动调用 args.toString()方法
    var result = eval('context.fn(' + args +')');
    delete ctx.fn;
    return result;
}

var Asian = {
    skin: 'yellow'
}

function Chinese(a, b, c, d) {
    console.log(this.skin);
    console.log([a, b, c, d]);
}

Chinese.$call(Asian, 1, 2, 3, 4);

// let arr = [1,2,3];
// eval('console.log('+ [arr[1], arr[2]] +')');


// apply 同理 只是参数不一样