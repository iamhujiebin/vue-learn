<template>
  <div>
    <ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram>
  </div>
</template>

<script>
  export default {
    data: function () {
      this.chartSettings = {
        labelMap: {
          "EnterStudio": "进房",
          "SendGift": "送礼",
          "date": '日期',
        },
        height:'10px',
      };
      return {
        chartData: {
          columns: ['date', 'EnterStudio','SendGift'],
          rows: [
            {'date': '1/1', 'EnterStudio': 2, 'SendGift': 3},
            {'date': '1/2', 'EnterStudio': 3, 'SendGift': 1},
            {'date': '1/3', 'EnterStudio': 4, 'SendGift': 3},
            {'date': '1/4', 'EnterStudio': 5, 'SendGift': 12},
            {'date': '1/5', 'EnterStudio': 6, 'SendGift': 5},
            {'date': '1/6', 'EnterStudio': 7, 'SendGift': 7},
            {'date': '1/7', 'EnterStudio': 7, 'SendGift': 7},
            {'date': '1/8', 'EnterStudio': 7, 'SendGift': 7},
            {'date': '1/9', 'EnterStudio': 7, 'SendGift': 7},
            {'date': '1/10', 'EnterStudio': 7, 'SendGift': 7},
            {'date': '1/11', 'EnterStudio': 7, 'SendGift': 7},
          ]
        },
      }
    }
  }
</script>
