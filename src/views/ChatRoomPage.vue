<template>
  <div>
    <h1>Create Chat Room</h1>
    <form @submit.prevent="createChatRoom">
      <div>
        <label for="auctionId">Auction ID:</label>
        <input v-model="auctionId" type="number" id="auctionId" required />
      </div>
      <div>
        <label for="memberId">Member ID:</label>
        <input v-model="memberId" type="number" id="memberId" required />
      </div>
      <button type="submit">Create Chat Room</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      auctionId: '',
      memberId: '',
      message: ''
    };
  },
  methods: {
    async createChatRoom() {
      const auctionId = Number(this.auctionId);
      const memberId = Number(this.memberId);
      
      if (isNaN(auctionId) || isNaN(memberId)) {
        this.message = 'Auction ID and Member ID must be valid numbers';
        return;
      }
      
      try {
        const response = await axios.post('http://localhost:8080/chat', null, {
          params: {
            auctionId: auctionId,
            memberId: memberId
          }
        });
        
        const chatRoomId = response.data;
        
        if (chatRoomId) {
          this.$router.push(`/chat/${chatRoomId}`);
        } else {
          this.message = 'Chat room created successfully but no ID was returned';
        }
      } catch (error) {
        console.error('Error creating chat room:', error.response?.data || error);
        this.message = error.response?.data || 'Error creating chat room.';
      }
    }
  }
};
</script>

<style scoped>

</style>
