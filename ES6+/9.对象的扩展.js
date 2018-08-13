/**五.Object.assign() */
//Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。

{
    const target = { a: 1 };//目标对象
    const source1 = { b: 2 };
    const source2 = { c: 3 };
    Object.assign(target, source1, source2);
    //Object.assign方法的第一个参数是目标对象，后面的参数都是源对象。
    print(target.c);//3
}
//如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。

//注意：
//1. Object.assign方法实行的是浅拷贝
//Object.assign拷贝得到的是这个对象的引用。这个对象的任何变化，都会反映到目标对象上面。
//2. Object.assign可以用来处理数组，但是会把数组视为对象。


//Object.assign() 常见用途


//1.为对象添加属性
{
    class Point {
        constructor(x, y) {
          Object.assign(this, {x, y});
        }
    }
    let aa = new Point(2,3);
    print(aa.x);//2
}

//2.为对象添加方法
{
    Object.assign(SomeClass.prototype, {
        someMethod(arg1, arg2) {
        },
        anotherMethod() {
        }
      });
      
    // 等同于下面的写法
    SomeClass.prototype.someMethod = function (arg1, arg2) {
    
    };
    SomeClass.prototype.anotherMethod = function () {
    
    };
}

//3.克隆对象
{
    function clone(origin) {
        return Object.assign({}, origin);
    }
    //上面代码将原始对象拷贝到一个空对象，就得到了原始对象的克隆。
    //只能克隆原始对象自身的值，不能克隆它继承的值
}
{   
    //保持继承链
    function clone(origin) {
        let originProto = Object.getPrototypeOf(origin);
        return Object.assign(Object.create(originProto), origin);
    }
}

/**六.属性的可枚举性和遍历 */
{
    
}