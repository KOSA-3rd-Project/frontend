<template>
  <div class="container">
    <div class="tinytitle">카테고리 > 상세 </div>
    <div class="maintitle spacebetween">
      <span>상품명
        <span class="beforebtn">진행전</span>
        <span class="ongoingbtn">진행중</span>
        <span class="finishbtn">종료</span>
      </span>
      <span>
        <v-btn icon class="ml-4">
            <v-icon>mdi-chat-outline</v-icon>
        </v-btn>
      </span>
    </div>

    <table>
      <tr>
        <td rowspan="8" class="leftwidth">
          <v-carousel
            cycle
            hide-delimiter-background
            show-arrows-on-hover
            class="custom-carousel"
            style="width: 500px; height: 500px;"
          >
            <v-carousel-item
              v-for="(item, i) in items"
              :key="i"
              :src="item.src"
              class="carousel-item"
            >
            </v-carousel-item>
          </v-carousel>
        </td>
        <td class="aligncenter">상품상태</td>
        <td class="alignright">새상품</td>
      </tr>
      <tr>
        <td class="aligncenter">상품위치</td>
        <td class="alignright">대한민국 서울</td>
      </tr>
      <tr>
        <td class="aligncenter">거래방법</td>
        <td class="alignright">택배</td>
      </tr>
      <tr>
        <td class="aligncenter">시작가격</td>
        <td class="alignright">1000원</td>
      </tr>
      <tr>
        <td class="aligncenter">현재가격</td>
        <td class="alignright">1000원</td>
      </tr>
      <tr>
        <td class="aligncenter">판매기간</td>
        <td class="alignright">2024년 7월 22 ~ 2024년 7월 24일<br>
            (2일 8시간 33분 4초 남음)</td>
      </tr>
      <tr>
        <td class="aligncenter">입찰상태</td>
        <td class="alignright">23 bids</td>
      </tr>
      <tr>
        <td class="aligncenter" colspan="2">
          <v-btn class="actionbutton" type="button" @click="requestBid">입찰하기</v-btn>
        </td>
      </tr>
      <tr>
        <td colspan="3">
        <span class="middletitle">상품설명&nbsp;&nbsp;&nbsp;</span>
        <span class="middletitle unbold" @click="showBidHistory">입찰내역</span>
        </td>
      </tr>
      <tr>
        <td colspan="3">
        {{ bodyContent }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'PaymentPage',
  data() {
    return {
      items: [
        {
          src: 'https://picsum.photos/800/400?image=10',
        },
        {
          src: 'https://picsum.photos/800/400?image=20',
        },
        {
          src: 'https://picsum.photos/800/400?image=30',
        },
      ],
      bodyContent: '본문'
    };
  },
  methods: {
    showBidHistory() {
      this.bodyContent = '본문 1';
    },
    requestBid() {
      
    }
  }
};
</script>


<style>
@import '@/assets/style.css';

table {
  width: 100%;
  border-collapse: collapse;
}

tr, td {
  height: 30px !important;
  padding: 0px !important;
  border: 1px solid black !important;
}

.leftwidth {
  width: 600px;
}

.custom-carousel {
  width: 600px !important;
  height: 600px !important;
}

.carousel-item {
  width: 600px !important;
  height: 600px !important;
}
</style>

