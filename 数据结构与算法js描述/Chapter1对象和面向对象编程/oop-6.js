/*6.1 原型链*/
function Shape () {
    this.name = 'shape';
    this.toString = function(){
        print(this.name);
        return this.name;
    };
}
function TwoDShape(){
    this.name = '2D shape';
}
function Triangle(side, height) { //底 + 高
    this.name = 'Triangle';//三角形
    this.side = side; 
    this.height = height;
    this.getArea = function () {
        var area = this.side * this.height / 2;
        print(area);
        return area;
    };
}
//对对象的prototype进行完全重写
TwoDShape.prototype = new Shape();
Triangle.prototype = new TwoDShape();
//Triangle => TwoDShape => Shape
print(TwoDShape.prototype.constructor == Shape);//true =>即重写对象的prototype的副作用
//对对象的constructor属性进行相应的重置
TwoDShape.prototype.constructor = TwoDShape;
Triangle.prototype.constructor = Triangle;
print(TwoDShape.prototype.constructor == TwoDShape);// true

//测试
/*var myArr = new Triangle (5,10);
myArr.getArea();//25
myArr.toString();//Triangle
//通过instanceof操作符，我们可以验证myArr对象同时是上述三个构造器的实例
print(myArr instanceof Triangle);//true
print(myArr instanceof TwoDShape);//true
print(myArr instanceof Shape);//true
print(myArr instanceof Array);//false*/

/**********************************************************************************/
/**********************************************************************************/
//将共享属性迁移到所有实体所共享的原型对象上去
//重写
//Shape TwoDshape
function Shape () {
    /*this.name = 'shape';
    this.toString = function(){
        print(this.name);
        return this.name;
    };*/
    Shape.prototype.name  =  'Shape';
    Shape.prototype.toString = function(){
        print(this.name);
        return this.name;
    }
}
function TwoDShape(){
   // this.name = '2D shape';
   //继承 先完成相关继承关系构建
   //TwoDShape.prototype = new Shape();
   TwoDShape.prototype = Shape.prototype;
   TwoDShape.prototype.constructor = TwoDShape;
   //声明原型  再对原型对象进行扩展
   TwoDShape.prototype.name = '2D Shape';
}

function Triangle(side,height){
    this.side = side;//私有的
    this.height = height;//私有的
}

//继承
//Triangle.prototype = new Triangle();//存放共享量
Triangle.prototype = TwoDShape.prototype;
Triangle.prototype.constructor = Triangle;
//声明原型
Triangle.prototype.name = 'triangle';//共享的
Triangle.prototype.getArea  = function(){//共享的
    var area = this.side * this.height / 2;
    print(area);
    return area;
}

var myShape = new Triangle(5,44);
myShape.getArea();//110
myShape.toString();//Trangle

//明确对象自身属性与其原型链属性
print(myShape.hasOwnProperty('side'));//true
print(myShape.hasOwnProperty('name'));//false



/**************************************/
/************改进3*********************/
/**************************************/

//继承自Shape.prototype比继承自new Shape()所创建的实体

