import Vue from 'vue'
import Router from 'vue-router'
import GoodList from "../views/GoodList"
import Title from "../views/Title"
import Image from "../views/Image"
import Cart from "../views/Cart"
import Goods2 from "../views/GoodList2"

Vue.use(Router)

export default new Router({//事实上是对console中api ：history的封装
  mode:'history',//默认hash，有#；还有history，需要后端支持
  routes: [
    {
      path:"/",
      component:Goods2,
    },
    {
      path: '/goods',
      components:{
        default:GoodList,
        title:Title,
        img:Image,
      }
    },
    {
      path:'/goods',
      name:'GoodList',
      component:GoodList,
      children:[
        {
          path:"title",
          name:"title",
          component:Title,
        },
        {
          path:"img",
          name:"img",
          component:Image,
        }
      ],
    },
    {
      path:'/cart',
      component:Cart,
    }
  ]
})
