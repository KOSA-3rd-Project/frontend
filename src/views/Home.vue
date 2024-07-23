<!-- 홈페이지 -->
<!-- 작성자: 이주윤 -->

<template>
    <div class="home">
        <h3>여기는 홈페이지</h3>
        <auction-of-the-month></auction-of-the-month>
        <new-auctions></new-auctions>
        <hot-auctions></hot-auctions>
    </div>
</template>

<script>
import AuctionOfTheMonth from '@/components/home/AuctionOfTheMonth.vue';
import NewAuctions from '@/components/home/NewAuctions.vue';
import HotAuctions from '@/components/home/HotAuctions.vue';

export default {
    name: 'Home',
    components: {
        AuctionOfTheMonth,
        NewAuctions,
        HotAuctions,
    },
};
</script>

<style scoped></style>
