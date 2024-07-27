<template>
  <div>
    <h2>경매 상품 등록</h2>
    <auction-form-compo>
      <template v-slot:submitBtn>
            등록하기
        </template>
    </auction-form-compo>
  </div>
</template>

<script>
import AuctionFormCompo from '@/components/auction/AuctionFormCompo.vue'

export default {
    components:{
        AuctionFormCompo
    }
}
</script>

<style>

</style>