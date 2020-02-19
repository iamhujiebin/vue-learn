<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider collapsible v-model="collapsed">
      <div class="logo">搜索待定</div>
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
      <a-layout-header style="background: #fff; padding: 0"></a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item v-for="(item,index) in breadcrumb" :key="index">{{item}}</a-breadcrumb-item>
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          Bill is a cat.
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
  import axios from "axios"

  export default {
    mounted() {
      axios.get('/static/config/sidebar.json').then(res => {
        this.sidebar = res.data;
        this.sidebar.forEach(value => {
          this.sidebarNameMap[value.id] = value.name
          if (value.child != null) {
            value.child.forEach(value2=>{
              this.sidebarNameMap[value2.id] = value2.name
            })
          }
        })
      })
    },
    data() {
      return {
        sidebar: [],
        sidebarNameMap: {},
        collapsed: false,
        theme: 'dark',
        selectedKeys: [],
        breadcrumb: [],
      };
    },
    methods: {
      setSelectedKeys(value) {
        this.selectedKeys = [value];
        let pi = value.split("-")[0];
        this.breadcrumb = [this.sidebarNameMap[pi],this.sidebarNameMap[value]];
        console.log(this.breadcrumb)
      }
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
