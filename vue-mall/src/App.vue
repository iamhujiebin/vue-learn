<template>
  <div id="app">
    <!--这里的图片,经过base64,变成了文本，性能会高-->
    <!--<img src="./assets/logo.png">-->
    <!--route-view去承担一下route的所有路由-->
    <router-view/>
    <!--<router-view class="left" name="title"/>-->
    <!--<router-view class="right" name="img"/>-->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  .left{
    width:20%;
    border: 1px solid gray;
    float: left;
  }
</style>
