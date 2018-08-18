/**
 * author: SunShinewyf
 * date: 2018-07-16
 * desc: 入口文件
 */

function MVVM(options) {
  this.$el = options.el;
  this.$data = options.data;
  this.$method = options.method;
  if (this.$el) {
    //对所有数据进行劫持
    new Observer(this.$data);
    //将数据直接代理到实例中，无需通过vm.$data来操作
    this.proxyData(this.$data);
    new Compile(this.$el, this);
  }
}

MVVM.prototype = {
  proxyData: function(data) {
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        get() {
          return data[key];
        },
        set(newValue) {
          data[key] = newValue;
        }
      });
    });
  }
};
