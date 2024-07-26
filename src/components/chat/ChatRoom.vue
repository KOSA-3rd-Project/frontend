<template>
  <div id="chat-room">
    <table>
      <tr>
        <td>
          <label>
            Member ID: <input v-model="memberId" type="number">
          </label>
        </td>
        <td>
          <label>
            Message:
            <input v-model="message" type="text" @keyup.enter="sendMessage">
          </label>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <div v-for="(item, idx) in recvList" :key="idx" :class="{'message-right': item.sessionId === currentSessionId, 'message-left': item.sessionId !== currentSessionId}">
            <strong>{{ item.memberId }}</strong><br>
            <span class="message">{{ item.message }}</span><br>
            {{ item.createdAt }}<br>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import Stomp from 'webstomp-client'
import SockJS from 'sockjs-client'
import { mapGetters } from 'vuex' // Assuming you're using Vuex for state management

export default {
  name: 'ChatRoom',
  data() {
    return {
      memberId: null, // Initialize with default or null
      message: "",
      recvList: [],
      chatRoomId: this.$route.params.chatRoomId, // Get chatRoomId from route params
      stompClient: null,
      currentSessionId: null
    }
  },
  computed: {
    ...mapGetters(['getCurrentMemberId']) // Retrieve memberId from Vuex store if using Vuex
  },
  watch: {
    '$route.params.chatRoomId': {
      immediate: true,
      handler(newChatRoomId) {
        this.chatRoomId = newChatRoomId;
        this.recvList = [];
        this.connect();
      }
    }
  },
  methods: {
    sendMessage(e) {
      if (e.keyCode === 13 && this.memberId !== null && this.message !== '') {
        this.send();
        this.message = '';
      }
    },
    send() {
      if (this.stompClient && this.stompClient.connected) {
        const msg = { 
          chatRoomId: this.chatRoomId,
          memberId: this.memberId, // Include memberId in the message payload
          message: this.message
        };
        this.stompClient.send("/receive", JSON.stringify(msg), {});
      }
    },
    connect() {
      if (this.stompClient) {
        this.stompClient.disconnect();
      }
      const serverURL = "http://localhost:8080/chat";
      let socket = new SockJS(serverURL);
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect({}, frame => {
        console.log('Connected:', frame);

        this.stompClient.subscribe("/user/queue/ids", msg => {
          const response = JSON.parse(msg.body);
          if (response.type === 'getId') {
            this.currentSessionId = response.sessionId;
          }
        });

        this.stompClient.subscribe("/send", res => {
          const messageData = JSON.parse(res.body);
          if (messageData.chatRoomId === this.chatRoomId) {
            this.recvList.push(messageData);
          }
        });
        
      }, error => {
        console.log('Connection error:', error);
      });
    }
  },
  created() {
    // Fetch memberId from Vuex store or API call if needed
    this.memberId = this.getCurrentMemberId; // Fetch memberId from Vuex store or API
  }
}
</script>

<style scoped>
.message {
  background-color: #EEEEEE;
  border-radius: 10px;
  padding: 10px;
  display: inline-block;
}

.message-left {
  text-align: left;
}

.message-right {
  text-align: right;
}
</style>
