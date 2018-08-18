/**
 * author: SunShinewyf
 * date: 2018-07-10
 * desc: 订阅器类
 */

/**
 *
 * @param {*vm} 双向绑定实例
 * @param {*expOrFn} 是表达式还是function
 * @param {*cb} 执行更新时的回调函数
 */
function Watcher(vm, expr, cb) {
  this.depIds = {}; //存储deps订阅的依赖
  this.vm = vm; //component 实例
  this.cb = cb; //更新数据时的回调函数
  this.expr = expr; //表达式还是function
  this.value = this.get(vm, expr); //在实例化的时候获取老值
}

Watcher.prototype = {
  //暴露给 Dep 类的方法，用于在订阅的数据更新时触发
  update: function() {
    const newValue = this.get(this.vm, this.expr); //获取到的新值
    const oldValue = this.value; //获取到的旧值
    if (newValue !== oldValue) {
      //判断新旧值是否相等，不相等就执行回调
      this.value = newValue;
      this.cb(newValue);
    }
  },

  addDep: function(dep) {
    //检查depIds对象是否存在某个实例，避免去查找原型链上的属性
    if (!this.depIds.hasOwnProperty(dep.id)) {
      dep.addSub(this); //在 dep 存储 watcher 监听器
      this.depIds[dep.id] = dep; //在 watcher 存储订阅者 dep
    }
  },

  //获取data中的值，可能出现 hello.a.b的情况
  getVal: function(vm, expr) {
    expr = expr.split('.');
    return expr.reduce((prev, next) => {
      return prev[next];
    }, vm.$data);
  },
  //获取值
  get: function(vm, expr) {
    Dep.target = this;
    const val = this.getVal(vm, expr);
    Dep.target = null;
    return val;
  }
};
