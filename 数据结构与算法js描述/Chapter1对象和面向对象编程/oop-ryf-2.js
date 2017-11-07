// 对象间继承的5种方法
// 现在有一个"动物"对象的构造函数 + 一个"猫"对象的构造函数
//怎么使猫继承动物

function Animal(){
    this.species = "animal";
}

function Cat(name,color){
　　this.name = name;
    this.color = color;
}

//1. 构造函数绑定 将父对象的构造函数绑定在子对象上
function Cat1(name,color){
    Animal.apply(this,arguments);
    this.name = name;
    this.color = color;
}

var cat1 = new Cat1("big hero","yellow");
print(cat1.species);

//2. prototype模式
//"猫"的prototype对象，指向一个Animal的实例，那么所有"猫"的实例，就能继承Animal了
function Cat2(name,color){
　　this.name = name;
    this.color = color;
}
Cat2.prototype = new Animal();
Cat2.prototype.constructor = Cat2;
var cat2 = new Cat2();
print(cat2.species);

//3.直接继承prototype [2方法的改进]
//因为animal中不变的对象可以直接写进prototye中，那么我们可以直接让Cat()跳过Animal()直接继承Animal.prototype
function Animal(){
    this.species = 'animal'
}
function Cat3(name,color){
　　this.name = name;
    this.color = color;
}
Animal.prototype.type ='none human';
Cat3.prototype = Animal.prototype;
Cat3.prototype.constructor = Cat3; 
var cat3 = new Cat3();
print(cat3.type);//none human

//===>优点:效率高，省内存
//==>问题：Cat.prototype和Animal.prototype现在指向了同一个对象 对Cat.prototype的修改，都会反映到Animal.prototype
//如现在的Animal.prototype.constructor 也变成了Cat3
print(Animal.prototype.constructor == Cat3);//true
print(Animal.prototype.constructor == Animal);//false


//4.利用空对象作为介质
function Cat4(name,color){
　　this.name = name;
    this.color = color;
}
function Animal4(){
    this.species = "animal";
}
Animal4.prototype.type = 'love human';
/*var F = function(){};
F.prototype = Animal4.prototype;
Cat4.prototype = new F();
Cat4.prototype.constructor = Cat4;
print(Cat4.prototype.constructor == Cat4);//true
print(Animal4.prototype.constructor == Animal4);//true*/


//由此封装成一个函数 实现构造函数之间的继承
function extend(Child,Parent){
    var F = function(){};
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.uber = Parent.prototype;
}
extend(Cat4,Animal4);
var cat4 = new Cat4();
print(cat4.type)//love human


//5. 拷贝继承   [我们所做的继承就是让子类能够拥有父类的属性，那么返璞归真]
function Animal5(){
    this.species = "animal";
}
function Cat5(name,color){
　　this.name = name;
    this.color = color;
}
Animal5.prototype.type = 'love human';
function extendCopy(Child,Parent){
    var p = Parent.prototype;
    var c = Child.prototype;
    for(var i in p){
        c[i] = p[i];
    }
    c.uber = p;
}

extendCopy(Cat5,Animal5);
var cat5 = new Cat5();
Cat5.prototype.constructor = Cat5;
print(cat5.type)//love human
print(Animal5.prototype.constructor == Animal5);



 













