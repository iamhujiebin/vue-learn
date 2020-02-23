<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider collapsible v-model="collapsed">
      <a-input-search placeholder="input search text" style="width: 98%" @search="onSearch"></a-input-search>
      <a-menu :theme="theme" mode="inline" :selectedKeys="selectedKeys" v-for="side in sidebar" v-bind:key="side.id">
        <a-sub-menu v-show="side.child != null" v-for="child in side.child" :key="child.id">
          <span slot="title">
            <a-icon :type="side.icon"/>
            <span>{{side.name}}</span>
          </span>
          <a-menu-item :key="child.id" @click="setSelectedKeys(child.id)">{{child.name}}</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: lightcyan; padding: 0">
        <nav-header></nav-header>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item v-for="(item,index) in breadcrumb" :key="index">{{item}}</a-breadcrumb-item>
        </a-breadcrumb>
        <user-list v-show="showTab==='user list'"></user-list>
        <web-socket v-show="showTab==='websocket'"></web-socket>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2020 Created by jiebin UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
  import axios from "axios"
  import UserList from "../components/UserList"
  import NavHeader from "../components/NavHeader";
  import WebSocket from "../components/websocket";

  export default {
    mounted() {
      this.getSideBar();
    },
    data() {
      return {
        originSidebar: [],
        sidebar: [],
        sidebarNameMap: {},
        collapsed: false,
        theme: 'dark',
        selectedKeys: [],
        breadcrumb: ["User","user list"],
        showTab: 'user list',
      };
    },
    components: {
      NavHeader,
      UserList,
      WebSocket,
    },
    methods: {
      setSelectedKeys(value) {
        this.selectedKeys = [value];
        let pi = value.split("-")[0];
        this.breadcrumb = [this.sidebarNameMap[pi], this.sidebarNameMap[value]];
        this.showTab = this.sidebarNameMap[value];
        console.log(this.breadcrumb)
      },
      getSideBar() {
        axios.get('/static/config/sidebar.json').then(res => {
          this.sidebar = res.data;
          this.originSidebar = res.data;
          this.sidebar.forEach(value => {
            this.sidebarNameMap[value.id] = value.name;
            if (value.child != null) {
              value.child.forEach(value2 => {
                this.sidebarNameMap[value2.id] = value2.name
              })
            }
          })
        });
      },
      onSearch(search) {
        console.log(`search:${search}`);
        //不能直接axios获取数据，是异步操作的。可能下面的先执行，导致重新渲染了
        let sidebar = this.originSidebar.slice();
        console.log(`sidebar:${JSON.stringify(sidebar)}`);
        let res = [];
        sidebar.forEach(value => {
          if (value.name.indexOf(search) > -1) {
            res.push(value)
          } else {
            if (value.child != null) {
              value.child.forEach(value2 => {
                if (value2.name.indexOf(search) > -1) {
                  res.push(value);
                  return true
                }
              })
            }
          }
        });
        this.sidebar = res;
      },
    }
  };
</script>

<style>
  #components-layout-demo-side .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }
</style>
