<template>
  <div id="container">
    <div class="chat-container">
      <div class="chatselection">
        <ChatRoomSelection @chatRoomSelected="chatRoomSelected"/>
      </div>
      <div class="chatroom">
        <router-view :key="selectedChatRoomId"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import ChatRoomSelection from '../components/chat/ChatRoomSelection.vue'

export default {
  name: 'Chat',
  components: {
    ChatRoomSelection
  },
  data() {
    return {
      selectedChatRoomId: null
    }
  },
  methods: {
    chatRoomSelected(chatRoomId) {
      this.selectedChatRoomId = chatRoomId;
      this.$router.push({ name: 'ChatRoom', params: { chatRoomId } });
    }
  }
}
</script>

<style>
@import '@/assets/style.css';

.chat-container {
  display: flex;
}
.chatselection {
  width: 30%;
}
.chatroom {
  width: 70%;
}
</style>
