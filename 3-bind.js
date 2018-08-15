/**
 * bind函数   
 *       创建新函数，bind的第一个参数是运行时的this
 */


  // 第一版
Function.prototype.bind2 = function (context) {
    var self = this;
    return function () {
        return self.apply(context);
    }

}

// bind传参模拟
// 第二版
Function.prototype.bind2 = function (context) {

    var self = this;
    // 获取bind2函数从第二个参数到最后一个参数
    var args = Array.prototype.slice.call(arguments, 1);

    return function () {
        // 这个时候的arguments是指bind返回的函数传入的参数
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(context, args.concat(bindArgs));
    }

}