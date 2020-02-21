<template>
  <div style="float: right;padding-right: 30px">
    <a style="margin: 3px" @click="login" v-show="isLoginIn===false">Login</a>
    <a style="margin: 3px" @click="logout" v-show="isLoginIn===true">Logout</a>
    <a-icon type="user"/>
    <span v-show="isLoginIn===true">{{adminData.name}}</span>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        adminData: {
          name: "杰彬",
        },
        isLoginIn: false,
      }
    },
    methods: {
      login() {
        console.log("login");
        this.adminData = {
          name: "杰彬",
        };
        this.isLoginIn = true;
      },
      logout() {
        console.log("logout");
        this.adminData = {};
        this.isLoginIn = false;
      }
    }
  }
</script>
