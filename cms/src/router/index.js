import Vue from 'vue'
import Router from 'vue-router'
import Layout from './../views/Layout'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path:"/",
      component:Layout,
    }
  ]
})
