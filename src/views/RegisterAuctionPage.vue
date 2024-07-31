<template>
  <v-container fluid>
      <base-title title="경매 상품 등록"></base-title>
        <auction-form-compo>
        <template v-slot:submitBtn>
          등록하기
        </template>
      </auction-form-compo>
  </v-container>
</template>

<script>
import AuctionFormCompo from '@/components/auction/AuctionFormCompo.vue'
import BaseTitle from '@/components/member/atoms/BaseTitle.vue';

export default {
    components:{
        AuctionFormCompo,
        BaseTitle,
    }
}
</script>

<style>

</style>