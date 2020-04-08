/****
 * @file 继承实现 es3 es5 es6
 * 归根结底是 寄生组合继承
 * 其他的各种方法都是 寄生组合继承的修改前身
 * 继承，继承的是什么?
 *      1.子类要继承父类this上挂载的属性/方法
 *      2.子类要继承父类prototype上挂在的属性和方法
 */

// Child 本身拥有firstname属性
// 期望: 执行继承后 Child拥有下面属性和方法
// Child.lastname
// Child.eat

/***
 * es3版
 *      1.子类要继承父类this上挂载的属性/方法
 *      => 借用父类方法call
 *      2.子类要继承父类prototype上挂在的属性和方法
 *      => children.prototype = new Parent() 的基础上改进
 *         (宿主、children.prototype = F.prototype 、 修正constructor)
 */
function Parent(obj) {
    this.lastname = obj.lastname;
    this.skin = obj.skin;
}
Parent.prototype.sayname = function () {
    console.log(this.lastname + this.firstname);
};

myExtends(Child, Parent);

// 定义Child 且 挂在父类的this属性和方法
function Child(obj) {
    Parent.call(this, obj);
    this.firstname = obj.firstname;
}

function myExtends(child, parent) {
    var F = function () {};
    F.prototype = parent.prototype;
    child.prototype = new F();
    child.prototype.constructor = child;
}

let child1 = new Child({
    firstname: '大雄',
    lastname: '野比',
    skin: 'yellow'
});
console.log(child1);
child1.sayname();
console.log(child1.constructor);

/***
 * es5版
 *      1.子类要继承父类this上挂载的属性/方法
 *      => 借用父类方法call
 *      2.子类要继承父类prototype上挂在的属性和方法
 *      => Object.create(parent.prototype, {.....})
 */
function Parent2(obj) {
    this.lastname = obj.lastname;
    this.skin = obj.skin;
}
Parent2.prototype.sayname = function () {
    console.log(this.lastname + this.firstname);
};

myExtends2(Child2, Parent2);

// 定义Child 且 挂在父类的this属性和方法
function Child2(obj) {
    Parent2.call(this, obj);
    this.firstname = obj.firstname;
}

function myExtends2(child, parent) {
    child.prototype = Object.create(parent.prototype, {
        constructor: {
            value: child,
            enumerable: false,
            configurable: true,
            writable: true
        }
    });
}

let child2 = new Child2({
    firstname: '大雄2',
    lastname: '野比2',
    skin: 'yellow2'
});
console.log(child2);
child2.sayname();
console.log(child2.constructor);

/***
 * es6版
 *      1.子类要继承父类this上挂载的属性/方法
 *      2.子类要继承父类prototype上挂在的属性和方法
 *      => class\ extends \ super
 */
class Parent3 {
    constructor(obj) {
        this.lastname = obj.lastname;
        this.skin = obj.skin;
    }
    sayname() {
        console.log(this.lastname + this.firstname);
    }
}


class Child3 extends Parent3 {
    constructor(obj) {
        super(obj);
        this.firstname = obj.firstname;
    }
}

let child3 = new Child3({
    firstname: '大雄3',
    lastname: '野比3',
    skin: 'yellow3'
});
console.log(child3);
child3.sayname();
console.log(child3.constructor);