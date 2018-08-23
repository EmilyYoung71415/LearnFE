
 // 服务容器 该片区内可提供的服务
 let serviceBox = {
    A:()=>{console.log(1)},
    B:()=>{console.log(2)},
    C:()=>{console.log(3)}
}

// 某一个服务订单 订阅了 两个服务，service负责执行(顺序等)
// 不关心服务内部
function serviceFunc(A,B){
    A()
    B()
}

// 获取目标函数注册的依赖项
// 获取整个形参
getFuncParams = function (func) { 
   var matches = func.toString().match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m); 
   console.log(matches)
   if (matches && matches.length > 1){
      let params =  matches[1].replace(/\s+/, '').split(','); 
      // ['A','B']
      return params
   } 
   return []; 
}
// 通过依赖项查询对应的服务
setFuncParams = function (params) { 
   for (var i in params) { 
       params[i] = serviceBox[params[i]]; // 赋值函数
   } 
   return params; 
}; //依次对应服务中的项进行查找返回结果。


// 注射器 
function Activitor(func, scope) { 
   return () => {
       func.apply(scope || {}, setFuncParams(getFuncParams(func)));
   } 
} 
// 实例化Service并调用方法 
var service = Activitor(serviceFunc); 
service();//1 2