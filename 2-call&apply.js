/**
 * 参考：https://github.com/mqyqingfeng/Blog/issues/11
 * 
 * call,apply:在使用指定this的情况下调用某个函数
 * apply写在数组中，call参数逐个列出
 * 
 * const A = {value:1}; const B = function(){this.value}
 * A.call(B) 调用A函数，但是A的this指向B，还可以给函数传入参数A.call(B,...arg)
 * 
 * call:
 *  1、将A函数内部的this指向B
 *  2、A函数执行
 * 
 * 思路：
 *  1、在A上添加函数B，执行后销毁，(这样调用A时 this.value会往上追溯得到value:1
 * 
 *  A.call(B)
    // 第一步
    B.fn = A
    // 第二步
    B.fn()
    // 第三步
    delete B.A


    一些注意点：
        1、call、apply可以传入参数
        ===-》获取处理不定参数 并执行
        2、this 参数可以传 null，当为 null 的时候，视为指向 window
        3、函数是可以有返回值的！
 */

 // 测试例子
var foo = {
    value: 1
};

function bar() {
    console.log(this.value);
}

/***********call1***********/
Function.prototype.call1 = function(context){
    // 获取调用call1的函数 ==-》this
    context.fn = this;
    context.fn();
    delete context.fn;
}

bar.call1(foo);

 
/***********call2*********i**/
// 传入参数 获取不定参数 
Function.prototype.call2 = function(context) {
    context.fn = this;
    var args = [];
    for(var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
    }
    // args为 ["arguments[1]", "arguments[2]", "arguments[3]"]
    // 将参数数组放到要执行的函数的参数里
    eval('context.fn(' + args +')');
    // 在eval中，args 自动调用 args.toString()方法
    //  var result = context.fn(arguments[1], arguments[2], ...);
    delete context.fn;
}
// 测试一下
var foo2 = {
    value: 1
};

function bar2(name, age) {
    console.log(name)
    console.log(age)
    console.log(this.value);
}

bar2.call2(foo2, 'kevin', 18); 
// kevin
// 18
// 1


/*******call3**** */
Function.prototype.call2 = function (context) {
    var context = context || window;
    context.fn = this;

    var args = [];
    for(var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
    }

    var result = eval('context.fn(' + args +')');

    delete context.fn
    return result;
}
