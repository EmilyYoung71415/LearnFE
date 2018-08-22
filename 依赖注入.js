/**
 * https://github.com/Aaaaaaaty/Blog/issues/26
 * 
 * http://yanhaijing.com/javascript/2014/01/24/dependency-injection-in-javascript/
 */


 // 服务容器 该片区内可提供的服务
 let service = {
     A:()=>{console.log(1)},
     B:()=>{console.log(2)},
     C:()=>{console.log(3)}
 }

// 某一个服务订单 订阅了 两个服务，service负责执行(顺序等)
// 不关心服务内部
 function service(A,B){
     A()
     B()
 }

 // 获取目标函数注册的依赖项
 // 获取整个形参
getFuncParams = function (func) { 
    var matches = func.toString().match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m); 
    if (matches && matches.length > 1) 
        return matches[1].replace(/\s+/, '').split(','); 
    return []; 
}
 // 通过依赖项查询对应的服务
setFuncParams = function (params) { 
    for (var i in params) { 
        params[i] = services[params[i]]; 
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
 var service = Activitor(Service); 
 service();//1 2