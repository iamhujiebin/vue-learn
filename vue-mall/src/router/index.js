import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from "../components/HelloWorld"
import GoodList from "../views/GoodList"

Vue.use(Router)

export default new Router({//事实上是对console中api ：history的封装
  mode:'hash',//默认hash，有#；还有history，需要后端支持
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/goods/:goodsId/user/:userId',
      name:'GoodList',
      component:GoodList,
    }
  ]
})
