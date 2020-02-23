<template>
  <a-form
    :form="form"
    class="login-form"
    @submit="handleSubmit"
  >
    <a-form-item>
      <a-input
        v-decorator="[
          'username',
          { rules: [{ required: true, message: 'Please input your username!' }] },
        ]"
        placeholder="Username"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-decorator="[
          'password',
          { rules: [{ required: true, message: 'Please input your Password!' }] },
        ]"
        type="password"
        placeholder="Password"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-checkbox
        v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true,
          },
        ]"
      >
        Remember me
      </a-checkbox>
      <a class="login-form-forgot" href="">
        Forgot password
      </a>
      <a-button type="primary" html-type="submit" class="login-form-button">
        Log in
      </a-button>
      Or
      <a href="">
        register now!
      </a>
    </a-form-item>
  </a-form>
</template>

<script>
  import axios from 'axios'

  export default {
    mounted(){
      if (this.$cookie.get("username") != null){
        this.$router.push("/cms").then(()=>{console.log(`cookie has login:${this.$cookie.get("username")}`)}).catch(error=>{console.error(error)})
      }
    },
    beforeCreate() {
      this.form = this.$form.createForm(this);
    },
    methods: {
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            axios.get(`${process.env.HTTP_URL}/user/login`, {
              params: {
                username: values.username,
                password: values.password,
              }
            }).then(res => {
              if (res.data.code === 0) {
                this.$cookie.set('username', values.username, 86400);
                this.$router.push("/cms").then(()=>{
                  alert(`欢迎登录:${this.$cookie.get('username')}`)
                }).catch(error => {
                  alert(error)
                })
              } else {
                alert(`login fail:${res.data.message}`)
              }
            }).catch(error => {
              alert(error)
            })
          }
        });
      },
    },
  };
</script>
<style>
  .login-form {
    position: absolute;
    top: 30%;
    left: 35%;
  }

  .login-form-forgot {
    float: right;
  }

  .login-form-button {
    width: 100%;
  }
</style>
