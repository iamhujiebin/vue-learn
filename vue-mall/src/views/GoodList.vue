<template>
  <div>
    这是商品列表
    <router-link to="/goods/title">点击商品title</router-link>
    <router-link to="/goods/img">点击商品image</router-link>
    <router-view></router-view>
    <br/>
    <router-link to="/cart?goodsId=123">点击到购物车</router-link>
    <br/>
    <button @click="jump">点击到购物车2</button>
    <br/>
    <button @click="load">load utils.js</button>
  </div>
</template>

<script>
  export default {
    name: "GoodList",
    methods:{
      jump(){
        this.$router.push("/cart?goodsId=456")
        //this.$router.go(-2) 回退两次。相当于浏览器api的后退。正数的话就是前进  go(0):刷新当前页面
      },
      load(){
        import("./../utils")
      }
    }
  }
</script>

<style scoped>

</style>
