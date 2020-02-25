<template>
  <div>
    <a-form layout="inline" :form="form" @submit="handleSearch">
      <a-form-item>
        <a-range-picker
          :showTime="{
        hideDisabledOptions: true,
        defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')]
      }"
          format="YYYY-MM-DD HH:mm:ss"
          v-decorator="[
          'date',
          { rules: [{ required: false }] },
          ]"
        ></a-range-picker>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">
          搜索
        </a-button>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="back">
          返回
        </a-button>
      </a-form-item>
    </a-form>
    <div style="height: 100px;"></div>
    <ve-pie v-show="!noData" :data="chartData" :settings="chartSettings"></ve-pie>
    <div v-show="noData">no data</div>
  </div>
</template>

<script>
  import axios from "axios";
  import moment from 'moment'


  export default {
    mounted() {
      // this.getUserEvent(0,0)
    },
    data() {
      this.chartSettings = {
        labelMap: {
          "type": '类型',
          "count": '数量',
        },
        radius: 150,
        limitShowNum: 8
      };
      return {
        form: this.$form.createForm(this),
        noData:false,
        chartData: {
          columns: ["type", "count"],
          rows: [
            {'type': 'EnterStudio', 'count': 7},//demo data
            {'type': 'SendGift', 'count': 9},//demo data
          ]
        },
      }
    },
    methods: {
      moment,
      getUserEvent(start, end) {
        axios.get(`${process.env.HTTP_URL}/user/eventSum`, {
          params: {
            start: start,
            end: end
          }
        }).then(res => {
          this.noData = false;
          if (res.data.body.event_count != null) {
            this.chartData.rows = [];
            let eventCount = res.data.body.event_count;
            for (let key in eventCount) {
              let row = {
                type: key,
                count: eventCount[key],
              };
              this.chartData.rows.push(row)
            }
          }
          if (this.chartData.rows.length<=0){
            this.noData = true
          }
        }).catch(error => {
          alert(error)
        })
      },
      handleSearch(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
          let start, end = 0;
          if (values.date != null) {
            start = moment(values.date[0]).valueOf();
            if (values.date.length > 1) {
              end = moment(values.date[1]).valueOf()
            }
          }
          this.getUserEvent(start, end)
        });
      },
      back(){
        this.$router.go(-1)
      }
    }
  }
</script>
