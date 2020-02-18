// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from "vue-lazyload";
import VueInfiniteScroll from "vue-infinite-scroll"
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
// import {sum,minus} from "./utils";
// import * as utils from "./utils";

Vue.config.productionTip = false;
// console.log(`enter a,b:${sum(1,2,3)},${minus(2,1)}`)
// console.log(`enter a,b:${utils.sum(1,2,3)},${utils.minus(2,1)}`)

Vue.use(VueLazyLoad,{
  loading:"/static/svg/loading-balls/svg"
});

Vue.use(VueInfiniteScroll);

Vue.use(Antd);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});
//可以通过.$mount("#app")  以及 render:h=>h(App) [底层Vue函数]
