<template>
  <div class="todo">
    <a-button type="primary" @click="initWebSocket">初始化websocket</a-button>
    <a-button type="primary" @click="websocketDoClose">断开websocket</a-button>
    <a-button type="primary" @click="websocketDoSend">发消息</a-button>
      <div slot="header"><h3>{{connectMsg}}</h3></div>
    <ul v-for="msg in receiveMsg">
      <transition name = "slide-fade">
        <li class="receive">{{msg}}</li>
      </transition>
    </ul>
      <div slot="footer"><h3>{{closeMsg}}</h3></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        websocket: null,
        receiveMsg: [],
        closeMsg: '',
        connectMsg:''
      }
    },
    // created() {
    //   this.initWebSocket();
    // },
    // destroyed() {
    //   this.websocket.close() //离开路由之后断开websocket连接
    // },
    methods: {
      initWebSocket() { //初始化websocket
        if (this.websocket != null) {
          console.log("还没断开:", this.websocket);
          return
        }
        const wsUri = "ws://127.0.0.1:3620/ws?room_id=9";//todo 这里先搞要给room_id
        this.websocket = new WebSocket(wsUri);
        this.websocket.onmessage = this.websocketOnMessage;
        this.websocket.onopen = this.websocketOnOpen;
        this.websocket.onerror = this.websocketOnError;
        this.websocket.onclose = this.websocketClose;
        this.receiveMsg = [];
        this.closeMsg = '';
        this.connectMsg = `连上:${this.websocket.url}`
      },
      websocketOnOpen() { //连接建立之后执行send方法发送数据
        let actions = {
          "cmd": "enterRoom",
          "req_id": 1,
          "msg_data": {
            "user_id": 9,
          }
        };
        this.websocketSend(JSON.stringify(actions));
      },
      websocketOnError() {//连接建立失败重连
        this.initWebSocket();
      },
      websocketOnMessage(e) { //数据接收
        const res = JSON.parse(e.data);
        this.receiveMsg.push(res);
      },
      websocketSend(data) {//数据发送
        this.websocket.send(data);
      },
      websocketDoSend(){
        if (this.websocket != null) {
          this.websocket.send(JSON.stringify(`{test:123}`));
        }
      },
      websocketDoClose() {
        if (this.websocket != null) {
          this.websocket.close();
        }
      },
      websocketClose(e) {  //关闭
        console.log('断开连接', e);
        this.closeMsg = `断开连接:${e.target.url},code:${e.code}`
        this.websocket = null;
      },
    },
  }
</script>

<style>
  .receive {
    border: 1px dashed #999;
    margin: 5px;
    line-height: 35px;
    padding-left: 5px;
    font-size: 12px;
    width: 100%;
  }
  .slide-fade-enter-active {
    transition: all 2s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active 用于 2.1.8 以下版本 */ {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
