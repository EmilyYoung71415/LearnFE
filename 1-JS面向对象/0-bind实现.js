/*****
 * Function.prototype.bind()
 *          function.bind(thisArg[, arg1[, arg2[, ...]]])
 *          1. 返回新的函数，不直接执行函数，手动调用新函数 => 返回新函数
 *          2. 给调用函数的this强制绑定为thisArg => call函数
 *          3. 传入参数 => arguments 处理 bind的参数  和 调用参数, 两次参数concat一下
 *          4. [重点]
 *             当 bind 返回的函数fn作为构造函数的时候，bind 时指定的 this 值失效(传入的参数不失效)
 *             var newFunc = Chinese.bind(Asian);
 *             let obj = new newFunc();  // console.log(this.skin) 应该输出为undefined
 *                                       // 因为此时this指向构造函数本身Chinese
 */


 /***
 * 核心：
 * bind和call的不同之处:
 *     var func = bind(this, arg1, arg2..)
 *     func(arg3,arg4...)
 * 1. bind传入this，返回新函数，调用新函数生效，并不调用原函数
 * 2. bind可以接受两次传值：bind时，调用时，需要将这两次的传值都传递到原函数接受到
 */
// base版
Function.prototype._bind = function (ctx) {
    var self = this; // 函数调用者 借用方法的借用人
    return function () {
        return self.apply(ctx);
    }
};


/***
 * 遗漏的case：
 * 1、可以接受传参，且两次传参
 * 2、bind生成的函数 可以new 作为构造函数调用
 *    当作为构造函数new时，bind强制绑定的this应该失效
 */

Function.prototype.$bind = function () {
    var args = [].slice.call(arguments); // 类数组转数组 bind(ctx, arg1, arg2..)
    var ctx = args.shift();
    var self = this; // 函数调用者 借用方法的借用人
    var fbind = function () {
        var bindArgs = [].slice.call(arguments);
        var _this = this instanceof fbind ? this : ctx;
        return self.apply(_this, args.concat(bindArgs));
    }
    // 当new bind生成的函数时func = new [Chinese.bind(xxx)]() 期望的是 Chinese上的 属性:this 和 原型上的
    // 由于bind返回新函数，所以会断开构造器与实例之间的联系，因此bind函数内部需要手动建立联系
    var F = function () {};
    F.prototype = self.prototype;
    fbind.prototype = new F();
    return fbind;
};

var Asian = {
    skin: 'yellow'
}

function Chinese(a, b, c, d) {
    this.color = 'red';
    console.log(this.skin);
    console.log([a, b, c, d]);
    console.log(this.color);
    console.log(this.test);
}
Chinese.prototype.test = 1;

// Chinese.$call(Asian, 1, 2, 3, 4);
let func = Chinese.$bind(Asian, 1, 2);
let p = new func(3,4);
console.log(p.constructor)