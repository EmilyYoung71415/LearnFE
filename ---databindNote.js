/**
 * 常见的数据绑定的实现方法
 *  数据劫持(vue)
 *      Object.defineProperty()
 *      去劫持数据每个属性对应的`getter`和`setter`
 *  脏值检测(angular)
 *      通过特定事件比如`input`，`change`，`xhr请求`等进行脏值检测
 * 
 *  发布-订阅模式(backbone)
 *      通过发布消息，订阅消息进行数据和视图的绑定监听
 */