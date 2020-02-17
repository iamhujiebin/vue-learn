// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import {sum,minus} from "./utils";
// import * as utils from "./utils";

Vue.config.productionTip = false;
// console.log(`enter a,b:${sum(1,2,3)},${minus(2,1)}`)
// console.log(`enter a,b:${utils.sum(1,2,3)},${utils.minus(2,1)}`)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});
