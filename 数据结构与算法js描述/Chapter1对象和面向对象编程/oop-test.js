/**
 * 彻底弄懂原型链
 */

function Person () {
    this.name = 'John';
}
var person = new Person();
Person.prototype.say = function() {
    console.log('Hello,' + this.name);
};
person.say();//Hello,John

