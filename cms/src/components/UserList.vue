<template>
  <div>
    <div class="ant-advanced-search-form">
      <a-form  :form="form" @submit="handleSearch">
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
    </div>
    <a-modal title="编辑用户" v-model="modalVisible" @ok="handleEditOk" @cancel="handleEditCancel">
      <a-form>
        <a-form-item label="user_id" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input
            v-decorator="['user_id', { rules: [{ required: false, message: '' }] }]"
            v-model="editUser.user_id"
            disabled="disabled"
          />
        </a-form-item>

        <a-form-item label="Username" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input
            v-decorator="['username', { rules: [{ required: true, message: 'Please input your username!' }] }]"
            v-model="editUser.username"
          />
        </a-form-item>
        <a-form-item label="age" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input
            v-decorator="['age', { rules: [{ required: true, message: 'Please input your age!' }] }]"
            v-model="editUser.age"
          />
        </a-form-item>
        <a-form-item label="address" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input
            v-decorator="['address', { rules: [{ required: false, message: 'Please input your address!' }] }]"
            v-model="editUser.address"
          />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-table :columns="columns" :dataSource="userData" :pagination="pagination" @change="onPageChange">
      <a slot="name" slot-scope="text" href="javascript:">{{text}}</a>
      <span slot="customTitle"><a-icon type="smile-o"/> Name</span>
      <span slot="action" slot-scope="record">
        <a-button type="primary" @click="showModal(record)">Edit</a-button>
        <a-divider type="vertical"/>
         <a-button @click="confirmDelete(record)">Delete</a-button>
        <a-divider type="vertical"/>
        <!--<a href="javascript:;" class="ant-dropdown-link"> More actions <a-icon type="down"/> </a>-->
     </span>
    </a-table>
  </div>
</template>
<script>
  import AFormItem from "ant-design-vue/es/form/FormItem";
  import axios from "axios"

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

  export default {
    components: {AFormItem},
    mounted() {
      console.log(`userData demo:${data}`)
      //this.getUserList();
    },
    data() {
      return {
        columns,
        form: this.$form.createForm(this),
        searchValues: ["username"],
        userId: 0,
        username: '',
        userData: [],
        modalVisible: false,
        pagination: {
          total: 0,
          position: 'top',
          showSizeChanger: true,
          pageSize: 10,
          showQuickJumper: true,
        },
        editUser: {}
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
          this.pagination.page = 1;
          this.userId = values.user_id;
          this.username = values.username;
          this.getUserList()
        });
      },
      handleReset() {
        this.form.resetFields();
      },
      getUserList() {
        axios.get("http://127.0.0.1:3600/user/getlist", {
          params: {
            user_id: this.userId,
            username: this.username,
            page: this.pagination.page,
            page_size: this.pagination.pageSize,
          }
        }).then(res => {
          this.userData = res.data.body.rows;
          this.pagination.total = res.data.body.total;
          if (this.userData != null) {
            this.userData.forEach(value => {
              value.key = value.user_id//为了vue 不报warning
            })
          }
        }).catch(error => {
          console.log(`getUserList fail:${error}`)
        })
      },
      onPageChange(pagination) {
        console.log(JSON.stringify(pagination));
        this.pagination.page = pagination.current;
        this.pagination.pageSize = pagination.pageSize;
        this.getUserList()
      },
      confirmDelete(record) {
        this.$confirm({
          title: 'Confirm',
          content: `删除用户:${record.username},userId:${record.user_id}`,
          okText: '确认',
          cancelText: '取消',
          onOk: () => {//这里需要协成要给function的形式(es6),才能直接this.getUserList()。像下面的onCancel(){}的写法不行。
            axios.get("http://127.0.0.1:3600/user/del", {
              params: {
                user_id: record.user_id,
              }
            }).then(res => {
              if (res.data.code === 0) {
                this.getUserList();
                this.openNotification();
              } else {
                alert(`出错1:${res.message}`)
              }
            }).catch(error => {
              alert(`出错2:${error}`)
            });
          },
          onCancel: () => {
          }
        });
      },
      openNotification() {
        this.$notification.open({
          message: '删除成功',
          icon: <a-icon type="smile" style="color: #108ee9" />,
        });
      },
      openNotificationEditOk() {
        this.$notification.open({
          message: '修改成功',
          icon: <a-icon type="smile" style="color: #108ee9" />,
        });
      },
      showModal(record) {
        this.editUser = Object.assign({}, record);//需要拷贝一个record内容，因为record绑定的是table中row的记录。如果直接赋值给this.editUser,会导致两者绑定一起
        this.modalVisible = true;
      },
      handleEditOk() {
        console.log(this.editUser);
        axios.get("http://127.0.0.1:3600/user/update", {
          params: {
            user_id: this.editUser.user_id,
            username: this.editUser.username,
            age: this.editUser.age,
            address: this.editUser.address,
          }
        }).then(res => {
          if (res.data.code === 0) {
            this.openNotificationEditOk();
            this.getUserList();
          } else {
            alert(`出错:${res.data.message}`)
          }
        }).catch(error => {
          alert(`出错:${error}`)
        });
        this.modalVisible = false;
      },
      handleEditCancel() {
        //this.getUserList() 因为上面的Object.assign({},record)，这里就可以省了
      }
    },
  };
</script>

<style>
  .ant-advanced-search-form {
    padding: 15px;
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
