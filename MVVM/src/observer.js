/**
 * author: SunShinewyf
 * date: 2018-07-09
 * desc: 数据监听功能
 */
function Observer(data) {
  this.data = data;
  this.observe(this.data);
}

Observer.prototype = {
  /**
   * @param {data} 要监听的数据对象
   */
  observe: function(data) {
    if (!data || typeof data !== 'object') return;
    //为每一个属性设置数据监听
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key]);
      this.observe(data[key]); //深度递归劫持属性
    });
  },

  /**
   * @param {data} 要监听的数据对象
   * @param {key} 要监听的对象属性key值
   * @param {value} 要监听的对象属性值
   */
  defineReactive: function(data, key, value) {
    let dep = new Dep();
    let self = this;

    //如果是该属性值是对象类型，则遍历
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: false,
      get: () => {
        //由于需要在闭包内添加watcher，所有需要 Dep 定义一个全局 target 属性，暂存 watcher ，添加完移除
        if (Dep.target) {
          //如果为true，则说明是实例化 watcher 引起的，所以需要添加进消息订阅器中
          dep.depend();
        }
        return value;
      },
      set: newVal => {
        if (newVal === value) return;
        value = newVal;
        //对新值进行监听
        self.observe(newVal);
        //通知所有订阅者
        dep.notify();
      }
    });
  }
};
