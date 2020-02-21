<template>
  <div class="todo">
    <a-button type="primary" @click="initWebSocket">初始化websocket</a-button>
    <a-button type="primary" @click="websocketDoClose">断开websocket</a-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        websocket: null,
      }
    },
    // created() {
    //   this.initWebSocket();
    // },
    // destroyed() {
    //   this.websocket.close() //离开路由之后断开websocket连接
    // },
    methods: {
      initWebSocket(){ //初始化websocket
        const wsUri = "ws://127.0.0.1:3620/nonolive/weex_ws/interactive/ws";
        this.websocket = new WebSocket(wsUri);
        this.websocket.onmessage = this.websocketOnMessage;
        this.websocket.onopen = this.websocketOnOpen;
        this.websocket.onerror = this.websocketOnError;
        this.websocket.onclose = this.websocketClose;
      },
      websocketOnOpen(){ //连接建立之后执行send方法发送数据
        let actions = {"test":"12345"};
        this.websocketSend(JSON.stringify(actions));
      },
      websocketOnError(){//连接建立失败重连
        this.initWebSocket();
      },
      websocketOnMessage(e){ //数据接收
        const res = JSON.parse(e.data);
        console.log(res)
      },
      websocketSend(Data){//数据发送
        this.websocket.send(Data);
      },
      websocketDoClose(){
        this.websocket.close();
      },
      websocketClose(e){  //关闭
        console.log('断开连接',e);
      },
    },
  }
</script>
