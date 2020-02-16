<template>
  <div id="app">
    <!--这里的图片,经过base64,变成了文本，性能会高-->
    <img src="./assets/logo.png">
    <!--route-view去承担一下route的所有路由-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
