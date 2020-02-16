<template>
    <div>
      这是商品列表
      <span>{{$route.params.goodsId}}</span>
      <span>{{$route.params.userId}}</span>
    </div>
</template>

<script>
    export default {
        name: "GoodList"
    }
</script>

<style scoped>

</style>
