<template>
  <div id="chat-room-selection">
    <button @click="selectChatRoom(1)">Chat Room 1</button><br>
    <button @click="selectChatRoom(2)">Chat Room 2</button><br>
    <button @click="selectChatRoom(3)">Chat Room 3</button><br>
  </div>
</template>

<script>
export default {
  name: 'ChatRoomSelection',
  methods: {
    selectChatRoom(chatRoomId) {
      this.$emit('chatRoomSelected', chatRoomId);
    }
  }
}
</script>
