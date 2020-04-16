// instanceof 运算符用来检测 constructor.prototype 是否存在于参数 object 的原型链上。
// 沿着原型链一直往上找 直到 L.__proto__ = null
// c.__proto__ = c.prototype
/***
 * person -> people -> Object
 * person instanceof people // true
 * person instanceof Object // true
 */
function _instanceof (c, p) {
    var prototype = p.prototype;
    c = c.__proto__;// 取 L 的隐式原型
    while (1) {
        if (c === null) return false;
        if (c === prototype) return true;
        c = c.__proto__;
    };
}

class People {}
class Person extends People {}
let p = new Person();
console.log(p instanceof Person);
console.log(p instanceof People);
console.log(p instanceof Object);

console.log(_instanceof(p, Person));
