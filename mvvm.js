/**
 * mvvm 即 model - view - viewmodel
 * 其中的viewmodel即由 paasiveview (mvp)进化实现的
 * 
 * 在viewmodel中有 binder
 * 以前全部由Presenter负责的View和Model之间数据同步操作交由给Binder处理
 * 只需要在View的模版语法当中，指令式地声明View上的显示的内容是和Model的哪一块数据绑定的
 * 
 * 当viewmodel对model进行更新时，binder会把数据更新到view上
 * 
 * 而当用户对view更新时 binder会把数据更新到model上 即双向绑定
 * 
 * 可以理解为 mvvm下的模板引擎会根据数据变更进行实时渲染
 *          即只要刚开始进行了显式绑定， （dom与model）
 *          那么此后 无论改变来自 model还是dom 内部机制都会保证双方的数据同一性
 *          我们做的绑定就是  告诉binder： view对应的model里数据的哪一部分
 * 
 * 
 * 参考链接：
 *      界面之下：还原真实的MV*模式
 *          https://github.com/livoras/blog/issues/11
 *      
 */