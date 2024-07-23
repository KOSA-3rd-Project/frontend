<!-- 홈페이지 -->
<!-- 작성자: 이주윤 -->

<template>
    <div class="home">
        <h3>여기는 홈페이지</h3>
        <promotion-item></promotion-item>
        <new-items></new-items>
        <hot-items></hot-items>
    </div>
</template>

<script>
import PromotionItem from '@/components/home/PromotionItem.vue';
import NewItems from '@/components/home/NewItems.vue';
import HotItems from '@/components/home/HotItems.vue';

export default {
    name: 'Home',
    components: {
        PromotionItem,
        NewItems,
        HotItems,
    },
};
</script>

<style scoped></style>
