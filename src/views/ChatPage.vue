<template>
  <div id="app">
    유저이름: 
    <input v-model="userName" type="text">
    내용: 
    <input v-model="message" type="text" @keyup="sendMessage">
    <div v-for="(item, idx) in recvList" :key="idx">
      <h3>유저이름: {{ item.userName }}</h3>
      <h3>내용: {{ item.content }}</h3>
    </div>
  </div>
</template>

<script>
import Stomp from 'webstomp-client'
import SockJS from 'sockjs-client'

export default {
  name: 'App',
  data() {
    return {
      userName: "",
      message: "",
      recvList: []
    }
  },
  created() {
    this.connect()
  },
  methods: {
    sendMessage(e) {
      if(e.keyCode === 13 && this.userName !== '' && this.message !== ''){
        this.send()
        this.message = ''
      }
    },    
    send() {
      if (this.stompClient && this.stompClient.connected) {
        const msg = { 
          userName: this.userName,
          content: this.message 
        };
        this.stompClient.send("/receive", JSON.stringify(msg), {});
      }
    },    
    connect() {
      const serverURL = "http://localhost:8080/chat";
      let socket = new SockJS(serverURL);
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect({}, frame => {
        console.log('Connected:', frame);
        this.stompClient.subscribe("/send", res => {
          const messageData = JSON.parse(res.body);
          this.recvList.push(messageData);
        });
      }, error => {
        console.log('Connection error:', error);
      });
    }
  }
}
</script>
