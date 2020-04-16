/****
 * function Chinese() {}
 * 定义一个函数，函数在this上 和 原型上挂载了属性和方法
 * let p = new Chinese()
 * 通过new操作符得到实例，实例可以访问得到 Chinese里 this 和 原型上的方法
 * 求问 new 做了什么?
 *      1. new 返回一个对象 newobj
 *      2. 访问 this 属性
 *      ==> constructor.apply(newobj, arguments) 给newobj上挂载新的属性
 *         访问 原型 属性
 *      ==> constructor 成为 newobj的构造器
 *          newobj._proto_ = constructor.prototype
 */
// var person = new Chinese(……);
// var person = _new(Chinese, ……)

// base版
function _new () {
    var newobj = {};
    var constructor = [].shift.call(arguments);
    newobj._proto_ = constructor.prototype;
    constructor.apply(newobj, arguments);
    return newobj;
}

/**
 * 遗漏的case:
 *  1. 构造函数有返回值： 对象 则 new 结果是对象， 返回值不是对象 则忽视
 *  2. typeof ret === 'object' ret为null时也满足
 */

// 完整版
function $new () {
    var newobj = {};
    var constructor = [].shift.call(arguments);
    var res = constructor.apply(newobj, arguments);
    newobj._proto_ = constructor.prototype;
    return typeof res === 'object' ? (res || newobj) : newobj;
}
