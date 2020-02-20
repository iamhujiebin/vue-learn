<template>
  <div>
    <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
      <a-row :gutter="24">
        <a-col v-for="(field,index) in searchValues" :key="index" :span="8">
          <a-form-item :label="field">
            <a-input :placeholder="field" v-decorator="[`${field}`,{rules: [{required: false}]}]"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24" :style="{ textAlign: 'right' }">
          <a-button type="primary" html-type="submit">
            Search
          </a-button>
          <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
            Clear
          </a-button>
        </a-col>
      </a-row>
    </a-form>
    <a-table :columns="columns" :dataSource="userData">
      <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
      <span slot="customTitle"><a-icon type="smile-o"/> Name</span>
      <span slot="action" slot-scope="record">
        <a href="javascript:;">Edit</a>
        <a-divider type="vertical"/>
        <a href="javascript:;">Delete</a>
        <a-divider type="vertical"/>
        <!--<a href="javascript:;" class="ant-dropdown-link"> More actions <a-icon type="down"/> </a>-->
     </span>
    </a-table>
  </div>
</template>
<script>
  const columns = [
    {
      dataIndex: 'user_id',
      key: 'user_id',
      title: 'UserId',
    },
    {
      dataIndex: 'username',
      key: 'username',
      slots: {title: 'customTitle'},
      scopedSlots: {customRender: 'name'},
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Action',
      key: 'action',
      scopedSlots: {customRender: 'action'},
    },
  ];
  const data = [ //demo data in table
    {
      user_id: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      user_id: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      user_id: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ];

  import axios from "axios"

  export default {
    mounted() {
      this.getUserList();
    },
    data() {
      return {
        columns,
        form: this.$form.createForm(this),
        searchValues: ["user_id", "username"],
        userData: [],
      };
    },
    methods: {
      handleSearch(e) {
        e.preventDefault();
        this.form.validateFields((error, values) => {
          if (error != null) {
            console.log('error', error);
            return
          }
          this.getUserList(values.user_id,values.username)
        });
      },
      handleReset() {
        this.form.resetFields();
      },
      getUserList(userId,username) {
        axios.get("http://127.0.0.1:3600/user/getlist", {
          params: {
            user_id: userId,
            username: username,
          }
        }).then(res => {
          this.userData = res.data.body.rows;
          if (this.userData != null){
            this.userData.forEach(value => {
              value.key = value.user_id//为了vue 不报warning
            })
          }
          console.log(JSON.stringify(this.userData))
        }).catch(error => {
          console.log(`getUserList fail:${error}`)
        })
      }
    },
  };
</script>

<style>
  .ant-advanced-search-form {
    padding: 10px;
    background: #fbfbfb;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
  }

  .ant-advanced-search-form .ant-form-item {
    display: flex;
  }

  .ant-advanced-search-form .ant-form-item-control-wrapper {
    flex: 1;
  }

  #components-form-demo-advanced-search .ant-form {
    max-width: none;
  }

  #components-form-demo-advanced-search .search-result-list {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
  }
</style>
