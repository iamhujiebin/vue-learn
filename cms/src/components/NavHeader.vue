<template>
  <div style="float: right;padding-right: 30px">
    <a style="margin: 3px" @click="logout" v-show="isLoginIn===true">Logout</a>
    <a-icon type="user"/>
    <span v-show="isLoginIn===true">{{adminData.name}}</span>
  </div>
</template>

<script>
  export default {
    mounted() {
      if (this.$cookie.get("username") !== null) {
        this.isLoginIn = true;
        this.adminData.name = this.$cookie.get("username")
      }
    },
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
          name: "杰",
        };
        this.isLoginIn = true;
      },
      logout() {
        console.log("logout");
        this.adminData = {};
        this.isLoginIn = false;
        this.$cookie.delete("username");
        this.$router.push("/login").then(()=>{alert(`登出!`)}).catch(error=>{console.log(error)});
      }
    }
  }
</script>
