import Vue from 'vue'
import Router from 'vue-router'
import Layout from './../views/Layout'
import Login from './../views/login'
import Chart2 from './../components/Chart2'

Vue.use(Router)

export default new Router({
  mode:'hash',//如果使用history参数（需要服务端支持），那么打包之后的，就无法通过127.0.0.1/cms直接访问页面了；hash模式用#分割，就可以不依赖服务器了
  routes: [
    {
      path:"/",
      component:Login,
    },
    {
      path:"/cms",
      component:Layout,
    },
    {
      path:"/login",
      component:Login,
    },
    {
      path:"/chart",
      component:Chart2,
    }
  ]
})
