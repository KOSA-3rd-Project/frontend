<template>
  <div class="container" v-if="isDataLoaded">
    <div class="tinytitle">카테고리 > {{ auctionData.categoryName }} </div>
    <div class="maintitle spacebetween">
      <span>{{ auctionData.itemName }}
        <span :class="statusClass">{{ auctionData.auctionStatusName }}</span>
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
          >
            <v-carousel-item
              v-for="(image, i) in images"
              :key="i"
              :src="image"
              class="carousel-item"
            >
            </v-carousel-item>
          </v-carousel>
        </td>
        <td class="aligncenter">상품상태</td>
        <td class="alignright">{{auctionData.auctionProductStatusName}}</td>
      </tr>
      <tr>
        <td class="aligncenter">상품위치</td>
        <td class="alignright">{{auctionData.location}}</td>
      </tr>
      <tr>
        <td class="aligncenter">거래방법</td>
        <td class="alignright">택배</td>
      </tr>
      <tr>
        <td class="aligncenter">시작가격</td>
        <td class="alignright">{{auctionData.startPrice}}원</td>
      </tr>
      <tr>
        <td class="aligncenter">현재가격</td>
        <td class="alignright">1000원</td>
      </tr>
      <tr>
        <td class="aligncenter">판매기간</td>
        <td class="alignright">{{ formattedStartDate }} ~ {{ formattedDueDate }}<br>
            {{ remainingTime }}</td>
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
          <span 
            class="middletitle" 
            :class="{ unbold: selectedMenu !== 'description' }" 
            @click="showAuctionDescription"
          >상품설명&nbsp;&nbsp;&nbsp;</span>
          <span 
            class="middletitle" 
            :class="{ unbold: selectedMenu !== 'bidHistory' }" 
            @click="showBidHistory"
          >입찰내역</span>
        </td>
      </tr>
      <tr>
        <td colspan="3">
          <div v-if="selectedMenu === 'description'">{{ auctionData.description }}</div>
          <div v-if="selectedMenu === 'bidHistory'">{{ bidHistory }}</div>
        </td>
      </tr>
    </table>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'AuctionDetailPage',
  data() {
    return {
      auctionData: {
        auctionId: this.$route.params.id,
        itemName: '',
        categoryName: '',
        auctionProductStatusName: '',
        auctionStatusName: '',
        auctionStatusId: '',
        location: '',
        startPrice: 0,
        startDate: '',
        dueDate: '',
        description: '',
      },
      images: [],
      mainImageIndex: null,
      isDataLoaded: false,
      selectedMenu: 'description',
      bidHistory:"",
      remainingTime: "",
    }
  },
  methods: {
    async setAuctionData() {
      try {
        const res = await axios.get(`/auctions/${this.$route.params.id}`, {
          headers: {
            'Content-Type': 'application/json',
            withCredentials: true,
          },
        });

        if (res.status === 200) {
          console.log(res.data);
          this.auctionData = res.data.auctionData;
          this.images = res.data.images;
          this.mainImageIndex = res.data.mainImageIndex;
          this.isDataLoaded = true; // 데이터 로드 완료
        } else {
          console.log(res.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
     updateRemainingTime() {
      const now = moment();
      const dueDate = moment(this.auctionData.dueDate);
      const duration = moment.duration(dueDate.diff(now));

      const days = duration.days();
      const hours = duration.hours();
      const minutes = duration.minutes();
      const seconds = duration.seconds();

      this.remainingTime = `${days}일 ${hours}시간 ${minutes}분 ${seconds}초 남음`;
    },
    startTimer() {
      this.timer = setInterval(this.updateRemainingTime, 1000);
    },
    stopTimer() {
      clearInterval(this.timer);
    },
    requestBid(){
      
    },
    showBidHistory(){
      this.selectedMenu = 'bidHistory';
    },
    showAuctionDescription(){
      this.selectedMenu = 'description';
    }
  },
  mounted() {
    this.setAuctionData();
    this.updateRemainingTime();
    this.startTimer();
  },
  beforeDestroy() {
    this.stopTimer();
  },
   
  computed: {
      formattedStartDate() {
        return moment(this.auctionData.startDate).format('YYYY년 MM월 DD일 HH시 mm분');
      },
      formattedDueDate() {
        return moment(this.auctionData.dueDate).format('YYYY년 MM월 DD일 HH시 mm분');
      },
      statusClass() {
      switch (this.auctionData.auctionStatusId) {
        case 1:
          return 'beforebtn';
        case 2:
          return 'ongoingbtn';
        case 3:
        case 4:
        case 5:
          return 'finishbtn';
        default:
          return '';
      }
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
  /* border: 1px solid black !important; */
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

.middletitle {
  cursor: pointer;
}
</style>

