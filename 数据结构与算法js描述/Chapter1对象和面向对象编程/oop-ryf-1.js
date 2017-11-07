//封装 ——原型对象生成实例
//1.构造函数
function Cat(name,color){
    this.name = name;
    this.color = color;
}
 var cat1 =  new Cat("大毛","yellow");
 var cat2 =  new Cat("大黄毛","while I am green");
 print('cat1 = ',cat1.color);
 print('cat2 = ',cat2.color);

 //cat1 和 cat2 都指向Cat 他们的原型
 //可通过cat1.constructor == Cat ==>true  constructor 指向他们的构造函数
 //cat1 instanceof Cat  ==>true   验证原型对象和实例对象之间的联系
 
 //*构造函数问题： 相同属性每次都要新生成内存，既重复输入又消耗内存//
//*为了解决共享属性的问题，由下引入prototype 属性//
//解释：
//每一个构造函数都有一个prototype属性，指向另一个对象。这个对象的所有属性和方法，都会被构造函数的实例继承。
function Cat2(name,color){
    this.name = name;
    this.color = color;
}
Cat2.prototype.type = "猫科动物";
Cat2.prototype.eat = 'eat mouse';

//生成实例
var cat20 =  new Cat2('Tom','black');
print(cat20.eat);

//关于prototype 的一些属性
//1. isPrototypeof()  某个proptotype对象和某个实例之间的关系
//Cat.prototype.isPrototypeOf(cat1) ==> true 
//2. hasOwnProperty() 用来判断某一个属性到底是本地属性，还是继承自prototype对象的属性。
//cat1.hasOwnProperty("name") ==>true
//cat1.hasOwnProperty("type") ==> false
//3. in 运算符 某个实例是否含有某个属性，不管是不是本地属性
//"name" in cat1 ==> true
//in运算符还可以用来遍历某个对象的所有属性。
for(var prop in cat20){
    print(prop);// name color type eat
}