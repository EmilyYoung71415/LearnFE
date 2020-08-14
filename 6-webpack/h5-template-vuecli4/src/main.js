import Vue from 'vue';
import App from './App.vue';
import VueAxios from './utils/request.js';
import './index.less';
Vue.config.productionTip = false;

Vue.use(VueAxios); // mount axios this.$http
new Vue({
  render: h => h(App),
}).$mount('#app')
