<template>
    <div>
      这是商品列表
      <router-link to="/goods/title">点击商品title</router-link>
      <router-link to="/goods/img">点击商品image</router-link>
      <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "GoodList"
    }
</script>

<style scoped>

</style>
