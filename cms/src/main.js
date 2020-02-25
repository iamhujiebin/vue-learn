// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Antd from 'ant-design-vue'
import VueCookie from 'vue-cookie'
import axios from 'axios'
import 'ant-design-vue/dist/antd.css'
import VeHistogram from 'v-charts/lib/histogram.common';
import VePie from 'v-charts/lib/pie.common';
// 下面的依赖可以按照需求选择性加载
// The following dependencies can be selectively loaded on demand
import 'echarts/lib/component/markLine';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/markArea';
import 'echarts/lib/component/visualMap';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/title';
import 'zrender/lib/svg/svg';
import 'v-charts/lib/style.css';

[VeHistogram,VePie].forEach(comp => {
  Vue.component(comp.name, comp);
});

Vue.config.productionTip = false;

axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  if (config.url.indexOf("user/login") < 0 && VueCookie.get("username") == null) {
    alert(`请先登录`)
    router.push("/").then().catch(error => {
      console.log(error)
    })
  }
  ;
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

Vue.use(Antd);
Vue.use(VueCookie);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});
