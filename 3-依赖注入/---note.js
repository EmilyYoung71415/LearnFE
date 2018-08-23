/**
 * https://github.com/Aaaaaaaty/Blog/issues/26
 * 
 * http://www.ituring.com.cn/article/68377
 * 
 * 依赖注入本质：
 *      有个仓库，维护着服务，
 *      有个注射器，能够
 *          get 根据你的订阅分析出依赖项（获取目标函数注册的依赖项）
 *          set 通过分析出的依赖项查询对应的服务   
 *      注射器最终返回一个可调用 "订阅服务"的函数
 * 
 * 
 * 这样设计的用意/本质：
 *      模仿了什么？解决了什么？方便了什么？
 *      像食品加工 或 病人开药（拿着药单子去订阅药，医生负责get药引，and set到注射器中）
 *      最终结果是：　输入了药方　得到了　可治愈Ａ、Ｂ病的注射器
 *                  本地无需维护制药厂(实现方法，无需制造类)
 * JS：
 *      一个题见 demo2
 * 
 *      依赖注入，即动态依赖。
 *      js中： bind、call等可以方便地控制函数参数和this变量
 *      AMD模块定义中。也是依赖注入
 * 
 * 
 * requirejs
 *      define(['service', 'router'], function(service, router) {       
            // ...
        });
*/

