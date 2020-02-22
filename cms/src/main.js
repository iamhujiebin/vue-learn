// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Antd from 'ant-design-vue'
import VueCookie from 'vue-cookie'
import axios from 'axios'
import 'ant-design-vue/dist/antd.css'

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
