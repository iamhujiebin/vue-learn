import Vue from 'vue'
import Router from 'vue-router'
import Layout from './../views/Layout'
import Login from './../views/login'

Vue.use(Router)

export default new Router({
  mode:'history',
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
    }
  ]
})
