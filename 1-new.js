/**
 * @func 知识点：
 *      new模拟实现、Object.create()作用与模拟实现、entend由类式继承实现
 * new思路：
 *      1、new Fun(); 则先创建一个新对象
        1.5: 获得构造函数 的原型
        1.8: 使得对象能访问构造函数的属性，则修改获得的构造函数内部的this指向
        2、使得对象_proto_ 指向构造函数的原型
 */

 /**
  * new模拟实现
        // 使用 new
        var person = new Otaku(……);
        // 使用 objectFactory
        var person = objectFactory(Otaku, ……)
  */

function objectFactory(){
    let newobj = new Object();
    // 获得构造函数
    Constructor = [].shift.call(arguments);
    newobj._proto_ = Constructor.prototype; //构造函数的原型
    // 让new对象能访问构造函数内的属性 即构造函数this指向变为new对象
    Constructor.apply(newobj,arguments);
    return newobj;
}

//改进1
function objectFactory2(){
    let newobj = new Object();
    // 获得构造函数
    Constructor = [].shift.call(arguments);
    newobj._proto_ = Constructor.prototype; //构造函数的原型
    // 让new对象能访问构造函数内的属性 即构造函数this指向变为new对象
    let res = Constructor.apply(newobj,arguments);
    return typeof ret === 'object'?res:newobj;
    //return newobj;
}

/**
 * Object.create()
 * 类式继承
 * child.prototype = Object.create(parent.prototype);
 * child.prototype.constructor = child;
 * 
 * 两个参数，第一个原型，第二个propertiesObject表示添加到新创建对象的可枚举属性
 */

Object.create = function(proto,propertiesObject){
    function F(){}
    F.prototype = proto;
    return new F();
}