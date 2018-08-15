/**
 * extend 由当前构造器扩展已有的构造函数
 * 借助apply\构造器、proxy拦截对construcor、apply等基本属性进行改造
 * 
 * 用法:
 * var Boy = extend(Person, function(name, age) {
        this.age = age;
   });

   extend(base,curFunc)//以base为继承对象，curConstructor为扩展
   1、descriptor：getOwnPropertyDescriptor 获取cur构造器的属性
   3、改变构造器属性为 父、子相融合结果 descriptor.value = proxy;
   4、Object.defineProperty(curobj.prototype, "constructor", descriptor);
   关键在于proxy 拦截的时候new Proxy(curFunc,handler);对当前构造器做了什么
 */

 function extend(base,curFunc){
    let descriptor =  Object.getOwnPropertyDescriptor(curFunc.prototype,'constructor');
    let handler = {
        construct:function(target,args){
            let obj = Object.create(curFunc.prototype);
            this.apply(target,obj,args);
            return obj;
        },
        apply:function(target,_this,arg){
            base.apply(_this,arg);
            curFunc.apply(_this,arg);
        }
    }

    let proxy = new Proxy(curFunc,handler);
    descriptor.value = proxy;
    Object.defineProperty(curFunc.prototype,'constructor',descriptor);
    return proxy;
 }

 // 测试
 function dad(name){
     this.name = name;
 }

 function child(name,age){
     this.age = age;
 }

 let person = extend(dad,child);
 let xiaohong = new person('xiaohong',13);
 console.log(xiaohong.age);