//声明式
/*var a = function(){}
function a(){}
**/
/*共有变量，私有变量*/
/*function a(){
    this.name ='haha',
    this.age = '19'
    var school =''//共有
} 

var m = new a();
print(m.age);//19
print(m.school);//undefined*/
/*回调函数*/
function multiplyByTwo(a, b, c) {
    var i, ar =[];
    for(i =0; i < 3; i++) {
        ar[i] = arguments[i] * 2;
    }
    return ar;
}
  
function addOne(a)	{
    return a + 1;
}
//测试下函数
print(multiplyByTwo(1,2,3));//2,4,6
print(addOne(222));//223

//实现三个元素在两个函数中传递
//改进1： 定义一个存储中间计算量的数组
var myarr =[];
myarr = multiplyByTwo(10,20, 30);//[20,40,60]
//然后，用循环遍历每个元素，并将它们分别传递给addOne()。
for (var i = 0; i < 3; i++) {myarr[i] = addOne(myarr[i]);}
print(myarr);//21,41,61

//改进2： 回调函数
/*function multiplyByTwo(a,b,c,callback) { 
    var i, ar =[]; 
    for(i =0; i < 3; i++){
        ar[i] = callback(arguments[i] * 2);
    }
    return ar;
}
var callarr = multiplyByTwo(1,2,3,addOne);//3,5,7
//var callarr = multiplyByTwo (l,2,3,function(a){return a+1});
print(callarr);*/

/*私有函数*/
var a = function (param) {
    function b(theinput) {//私有函数
        return theinput * 2;
    };
    return 'The result is ' + b (param);
};
print(a(2));//The result is 4
print(a(8));//The result is 16
//print(b(2));//b is not defined

/*重写自己的函数 */

var selfFunc = function () { 
    function someSetup(){//私有函数
          var setup = 'done';
          print(setup);
    }
    function actualWork(){//私有函数
        print('Worky-worky');
    }
    someSetup(); 
    return actualWork;//返回函数变量actualWork的引用
    //返回值会重新赋值给a
}();

//被最初载入时 自调的 done
//被再次调用时 Worky-worky
selfFunc();

/*闭包*/
var a = 1; 
function f () {var b = 1; return a;}
print('bibao = '+f());//bibao = 1
//print(b);// not defined

var a = 1;
function ff() { 
    var b = 1; 
    function n() { 
        var c = 3;
        print('a = '+ a);//1
        print('b = '+ b);//2
        print('c = '+ c);//3
    }
    n();
}
ff();

//function f1() {var aaaa = 1; f2 ();}
//function f2(){print(aaaa);}//aaaa is not defined
//f1();
//因为当f2 ()被定义时（不是执行时），变量a是不可见的

//闭包突破作用域链 #1
function ft(){
    var b = 'b';
    return function(){
        print(b);
        return b;
    }
}
//print(b);//b is not defined

var n = ft();//返回值赋给一个全局变量
//n();//b


//闭包突破作用域 #2
var nn;
function ft(){
    var b = 'b';
    nn = function(){
        print(b);
        return b;
    }
}
nn();//b

//循环中的闭包#4
function f3(){
    var a = [];
    var i;
    for(i = 0;i<3;i++){
        a[i] = function(){
            //创建的3个闭包，指向一个共同的局部变量i
            print(i);//返回的其实是i的当前值[因为闭包不会记录他们的值，他们拥有的只是一个i的连接(即引用)]
            //当循环结束时i的值为3,这三个闭包函数就是指向的这一个共同值
            return i;
        }
    }
    return a;
}
var a3 = f3();//包含3个函数的数组
a3[0]();//3
a3[1]();//3
//改进1 需要3个不同的变量 那么我们现在换一种闭包形式
function f31(){
    var a = [];
    var i;
    for(i = 0;i<3;i++){
       a[i]=(function(x){
            return function(){
                print(x);
                return x;
            }
       })(i);
    }
    return a;
}
var a31 = f31();
a31[0]();//0
a31[1]();//1

//改进2 换一个内部函数[不使用自调函数]
function f32() {
    function makeClosure(x)	{
        return function(){
            return x;
        }
    }
    var a =[];
    var i;
    for(i = 0; i < 3; i++) { 
        a [i] = makeClosure(i);
    }
    return a;
}
f32();
    




/*闭包应用*/
//1.Getter Setter
var getValue,setValue;
(function(){
    var secret = 0 ;
    getValue = function(){
        print(secret);
        return secret;
    };
    setValue = function(v){
        secret = v;
        print(secret);
    };
})()
getValue();//0
setValue(3);
getValue();//3
//2.迭代器
function setup(x){
    var i = 0;
    return function(){
        return x[i++];
    };
}

var next = setup(['a','b','c']);
//print(next());//a
//print(next());//b

