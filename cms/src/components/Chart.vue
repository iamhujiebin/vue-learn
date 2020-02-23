<template>
  <div class="hello">
    <div id="chart1"></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    mounted() {
      this.$chart.line1('chart1');
    }
  }
</script>

<style scoped>
  #chart1 {
    position: absolute;
    top: 50%;
    left: 50%;
  }
</style>
