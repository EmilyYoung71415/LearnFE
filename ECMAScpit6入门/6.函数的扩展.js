//1.函数参数的默认值
//ES6 之前，不能直接为函数的参数指定默认值，只能采用变通的方法。
{
    //es5 
    //检查函数log的参数y有没有赋值，如果没有，则指定默认值为World
    function log(x, y) {
        y = y || 'World';
    }
}

{
    //es6
    function log(x, y = 'World') {
        print(x, y);
    }
    log(); //undefined world
}

//与解构赋值默认值结合使用
function fetch(url, { body = '', method = 'GET', headers = {} }) {
    print(method);
  }
  
fetch('http://example.com', {})//GET
//fetch('http://example.com')// 报错
// 如果定义函数的时候没有设置默认值,那么调用的时候就要用

//当然也可以在定义函数的时候设置默认值 那么调用的时候就不加了
function fetch(url, { body = '', method = 'GET', headers = {} } = {}) {
    print(method);
}
  
fetch('http://example.com')//GET


/**二.rest 参数 */
//形式是 ...变量名
//用于获取函数的多余参数，这样就不需要使用arguments对象了

{
    function add(...values) {
        let sum = 0;
        for (var val of values) {
          sum += val;
        }
        print(sum);
      }
      add(2, 5, 3) // 10
}

{
    //es5 语法 使用arguments 接受多余变量
    function sortNumbers() {
        print(Array.prototype.slice.call(arguments).sort());
        //arguments对象不是数组，而是一个类似数组的对象
        //使用Array.prototype.slice.call(arguments)先将arguments转为数组 然后使用数组的sort 方法
    }
    sortNumbers(2,8,4);//2,4,8
}

{
    //es6 
    //rest 参数就不存在这个问题，它就是一个真正的数组，数组特有的方法都可以使用
    // rest参数的写法
    const sortNumbers = (...numbers) => numbers.sort();
    print(sortNumbers(3,1,9));//1 3 9
}

//利用 rest 参数改写数组push方法的例子。
{
    function push(array, ...items) {
        items.forEach(function(item) {
          array.push(item);
        });
    }
    let  a =[];
    push(a,1,20,3333)
    print(a);// 1 20 3333
}

//注意：rest 参数之后不能再有其他参数（即只能是最后一个参数）

/*****5.  箭头函数*/
//ES6 允许使用“箭头”（=>）定义函数。
{
    var f = v => v;
    //等同于 es5的
    var f = function(v) {
        return v;
    };
}
//如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分。
{
    var f = () => 5;
    // 等同于
    var f = function () { return 5 };

    var sum = (num1, num2) => num1 + num2;
    // 等同于
    var sum = function(num1, num2) {
      return num1 + num2;
    };
}

//箭头函数可以与变量解构结合使用。
{
    //const full = ({ first, last }) => first + ' ' + last;
    
    // 等同于
    function full(person) {
      return person.first + ' ' + person.last;
    }
}

//如果函数内部语句多于1条 则需要将函数部分用{}括起来
//var sum = (num1, num2) => { return num1 + num2; }


//箭头函数用处
//1.简化回调
{
    {
        [1,2,3].map(function (x) {
            print(x * x);// 1 4 9
        });
    }
   {//箭头函数
        print([1,2,3].map(x => x * x));//1 4 9
   }
}


{
    var values = [1,2,3]
    {
        var result = values.sort(function (a, b) {
            return a - b;
        });
    }
    {//箭头函数
        var result = values.sort((a, b) => a - b);
    }
}

//rest参数与箭头函数结合
{
    const numbers = (...nums) => nums;//输入变为数组
    print(numbers(1, 2, 3, 4, 5));// 1 2  3 4 5


    const headAndTail = (head, ...tail) => [head, tail];
    print(headAndTail(1, 2, 3, 4, 5))// [1,[2,3,4,5]]
}

//箭头函数的注意点：
/*
（1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。

（2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。

（3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

（4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。
*/

/****六.双冒号运算符 */

/***七.尾调用优化 */
