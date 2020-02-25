<template>
  <div>
    <a-form layout="inline" :form="form" @submit="handleSearch">
      <a-form-item>
        <a-input
          v-decorator="[
          'userId',
          { rules: [{ required: true, message: 'Please input your userId!' }] },
          ]"
          placeholder="userId"
        >
          <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)"/>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-range-picker
          :disabledDate="disabledDate"
          :disabledTime="disabledRangeTime"
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
    </a-form>
    <v-chart class="echarts" :options="scatter"/>
  </div>
</template>

<style>
  .echarts {
    width: 100%;
    height: 100%;
    position: relative;
    top: 50%;
    left: 20%;
  }
</style>

<script>
  import ECharts from 'vue-echarts' //google搜索这个关键字查询文档,https://github.com/ecomfe/vue-echarts
  import axios from 'axios'
  import 'echarts/lib/chart/scatter'
  import AFormItem from "ant-design-vue/es/form/FormItem";
  import moment from 'moment'

  export default {
    components: {
      AFormItem,
      'v-chart': ECharts
    },
    mounted() {
      axios.get(`${process.env.HTTP_URL}/user/eventType`).then(res => {
        if (res.data.body != null) {
          res.data.body.forEach((value, index) => {
            this.eventTypeMap[index] = value;
            this.category.push(value)
          })
        }
      }).catch(error => {
        console.log(error)
      })
      console.log(this.scatter)
      console.log(this.category)
    },
    data() {
      return {
        form: this.$form.createForm(this),
        eventTypeMap: {},
        category: [],
        scatter: {
          xAxis: {
            type: 'category'
          },
          yAxis: {
            type: 'category',
            data: this.$options.category,
          },
          tooltip: {},
          series: [{
            symbolSize: 20,
            data: [
              ["2019", "Login"],
              ["2010", "LightUp"],
              ["2012", "SendGift"],
              ["2013", "AddPost"],
              ["2014", "AddPostAddPostAddPost"],
            ],
            type: 'scatter'
          }]
        },
      }
    },
    methods: {
      moment,
      range(start, end) {
        const result = [];
        for (let i = start; i < end; i++) {
          result.push(i);
        }
        return result;
      },
      disabledDate(current) {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
      },
      disabledRangeTime(_, type) {
        if (type === 'start') {
          return {
            disabledHours: () => this.range(0, 60).splice(4, 20),
            disabledMinutes: () => this.range(30, 60),
            disabledSeconds: () => [55, 56],
          };
        }
        return {
          disabledHours: () => this.range(0, 60).splice(20, 4),
          disabledMinutes: () => this.range(0, 31),
          disabledSeconds: () => [55, 56],
        };
      },
      handleSearch(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
          let start, end = 0
          if (values.date != null) {
            start = moment(values.date[0]).valueOf()
            if (values.date.length > 1) {
              end = moment(values.date[1]).valueOf()
            }
          }
          axios.get(`${process.env.HTTP_URL}/user/event2`, {
            params: {
              user_id: values.userId,
              start: start,
              end: end,
            }
          }).then(res => {
            this.scatter.series[0].data = [];
            res.data.body.data.forEach(value => {
              let row = [value.x, this.eventTypeMap[value.y]];
              this.scatter.series[0].data.push(row);
            })
            console.log(this.scatter)
          }).catch(error => {
            console.log(error)
          })
        });
      }
    }
  }
</script>
