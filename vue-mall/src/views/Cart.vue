<template>
    <div>
      这里是Cart
      <span>{{$route.query.goodsId}}</span>
      <button @click="back">回退</button>
    </div>
</template>

<script>
    export default {
        name: "Cart",
        methods:{
          back(){
            this.$router.go(-1)
          }
        }
    }
</script>

<style scoped>

</style>
