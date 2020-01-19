//解析异构有点像模式匹配
//只要等号两边的模式相同，左边的变量就会被赋予对应的值

/**一.解析异构解释： */


//1.数组的解析异构
let [a, b, c] = [1, 2, 3];
print(a,b,c);//1 2 3 

let [ , , third] = ["foo", "bar", "baz"];
print(third);//baz

let [head, ...tail] = [1, 2, 3, 4];
print(head);//1
print(tail);//[2,3,4]

//如果解构不成功，变量的值就等于undefined。

//2.对象的解析异构
//数组的元素是按次序排列的，变量的取值由它的位置决定；
//而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

let { baz } = { foo: "aaa", bar: "bbb" };
print(baz);//undefined

let { bar } = { foo: "aaa", bar: "bbb" };
print(bar);//bbb


//2.1 如果变量名与属性名不一致，必须写成下面这样。
let { foo: aa } = { foo: 'aaa', bar: 'bbb' };
print(aa);//aaa

//实际上 对象的解构赋值是下面形式的简写
let { foo: foo1, bar: bar1 } = { foo: "aaa", bar: "bbb" };
//对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。

//5. 函数参数的解析异构
function add([x, y]){
    print(x + y);
}

add([1, 2]);
//虽然传的一个数组，但是在传入参数的那一刻，数组参数就被解构成变量x和y

print([[1, 2], [3, 4]].map(([a, b]) => a + b));//===> 3,7

/**二.变量解析异构用途 */


//1.交换变量的值
let x = 1;
let y = 4;
[x,y] = [y,x];
print(x);//4

//2.从函数返回多个值
//函数只能返回一个值，如果要返回多个值，只能将它们放在数组或对象里返回。
//===>有了解构赋值，取出这些值就非常方便。
{
    function example() {
        return [1, 2, 3];
    }
    let [a, b, c] = example();
    print([a, b, c]);//1 2 3
}

{
    function example() {
        return {
          foo: 1,
          bar: 2
        };
    }
    let { foo, bar } = example();
    print(foo);//1
}


//3.函数参数的定义
//解构赋值可以方便地将一组参数与变量名对应起来。

{
    //// 参数是一组有次序的值
    function f([x, y, z]) {
        print(x,y,z);
     }
    f([1, 2, 3]);//1 2 3
}

{
    function f({x, y, z}) {
        print(x,y,z);
    }
    f({z: 5, y: 4, x: 7});//7 4 5
}

//4. 提取JSON数据
{
    let jsonData = {
        id: 42,
        status: "OK",
        data: [867, 5309]
    };
    let { id, status, data: number } = jsonData;
    print(id, status, number);//42 ok [867,5309]
}

//5.函数参数的默认值
//就避免了在函数体内部再写var foo = config.foo || 'default foo';这样的语句。


//6.遍历Map结构
//任何部署了Iterator接口的对象，都可以用for...of循环遍历
//Map结构原生支持Iterator接口，
//===>配合变量的解构赋值，获取键名和键值就非常方便。

const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  print(key + " is " + value);
  //first is hello
  //second is world
}

//只获取键名
for (let [key] of map) {
    print(key);
    //first
    //second
}

//只获取键值
for (let [,value] of map) {
    print(value);
    //hello
    //world
}

//7.输入模块的指定方法
//加载模块时，往往需要指定输入哪些方法。解构赋值使得输入语句非常清晰。
//const { SourceMapConsumer, SourceNode } = require("source-map");