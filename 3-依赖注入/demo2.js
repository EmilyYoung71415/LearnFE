/****
 * 实现一个依赖注入的注射器
 * 
 * 要求满足：
 *  // 要注入的依赖
    var deps = {
        'dep1': function () {return 'this is dep1';},
        'dep2': function () {return 'this is dep2';},
        'dep3': function () {return 'this is dep3';},
        'dep4': function () {return 'this is dep4';}
    };

    // 新建一个“注射器”
    var di = new DI(deps);

    // 注射
    var myFunc = di.inject(function (dep3, dep1, dep2) {// 匿名函数即订阅服务的service
        return [dep1(), dep2(), dep3()].join(' -> ');
    });

    // 测试
    Test.assertEquals(myFunc(), 'this is dep1 -> this is dep2 -> this is dep3');
 */

function DI(dependency){
    this.dependency = dependency
}

DI.prototype = {
    inject:function(func){
        let deps = /^[^(]+\(([^)]+)/.exec(func.toString());
        //  构建参数绑定数组
        deps = deps ? deps[1]
            .split(/\s?,\s?/)
            .map(function (dep) {
                return this.dependency[dep];
            }.bind(this)) : [];
        
         // 通过apply将依赖参数传入函数
        return function () {
            return func.apply(this, deps);
        };
    }
}



/**
 * 分析
    // func 里面传参，参数不定，我们要拿到函数的形参 对应 依赖项中找
    // 因为不存在 inject(deps.dep1,deps.dep2....) 形参即实参..
 * 
 * 
 * 
 */