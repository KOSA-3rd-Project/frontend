<template>
  <div class="container" v-if="isAuctionDataLoaded && isBiddingDataLoaded">
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
        <td class="alignright">{{ biddingData[0].price }}원</td>
      </tr>
      <tr>
        <td class="aligncenter">판매기간</td>
        <td class="alignright">{{ formattedStartDate }} ~ {{ formattedDueDate }}<br>
            {{ remainingTime }}</td>
      </tr>
      <tr>
        <td class="aligncenter">입찰상태</td>
        <td class="alignright">{{ biddingData.length }} bids</td>
      </tr>
      <tr>
        <td class="aligncenter" colspan="2">
            <v-dialog v-model="dialog"  max-width="500">
              <template v-slot:activator="{ on }">
                <v-btn class="actionbutton" dark v-on="on" @click.stop="dialog = true">입찰하기</v-btn>
              </template>
              <v-card>
                <v-card-title class="headline">입찰 신청</v-card-title>
                <v-card-text>
                  <v-layout row wrap>
                        <v-flex xs12 sm6>
                          <p class="text-lg-h6 font-weight-bold">현재 입찰가</p>
                        </v-flex>
                        <v-flex xs12 sm6>
                          <p class="text-lg-h6 font-weight-bold">{{ biddingData[0].price }}원</p>
                        </v-flex>
                        <v-flex xs12 sm6>
                          <p class="text-lg-h6 font-weight-bold">입찰가</p>
                        </v-flex>
                        <v-flex xs12 sm6>
                          <v-text-field
                            single-line
                            outline v-model="newBidingPrice"
                            :error-messages="errorMessages"
                            @input="validateBidPrice"></v-text-field>
                        </v-flex> 
                  </v-layout>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="dark" flat @click="submitBid()">입찰 하기</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
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
          <div v-if="selectedMenu === 'bidHistory'">
            <div v-for = "(bidding, index) in biddingData" :key="index">
              <span> {{ index+1 }}
              {{ bidding.price }}
              {{ bidding.memberId}}
              {{ bidding.time }}</span>
            </div>
          </div>
        </td>
      </tr>
    </table>
    <!-- 성공 메시지 모달 -->
    <v-dialog v-model="successDialog" max-width="500">
      <v-card>
        <v-card-title class="headline">입찰 완료</v-card-title>
        <v-card-text>
          입찰이 성공적으로 완료되었습니다.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="dark" flat @click="successDialog = false">확인</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      biddingData: [],
      images: [],
      mainImageIndex: null,
      isAuctionDataLoaded: false,
      isBiddingDataLoaded: false,
      selectedMenu: 'description',
      bidHistory:"",
      remainingTime: "",
      dialog : false,
      newBidingPrice:null,
      successDialog: false,
      errorMessages: [],
      isBidPriceValid: false,
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
          this.isAuctionDataLoaded = true; // 데이터 로드 완료
        } else {
          console.log(res.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
    async setBiddingData() {
      try {
        const res = await axios.get(`/auctions/${this.$route.params.id}/bids`, {
          headers: {
            withCredentials: true,
          },
        });

        if (res.status === 200) {
          console.log(res.data);
          this.biddingData = res.data.biddingData;
          this.isBiddingDataLoaded = true; // 데이터 로드 완료
        } else {
          console.log(res.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
    async submitBid(){
      if (!this.isBidPriceValid) {
        return; // 유효하지 않은 경우, 제출하지 않음
      }

      const formData = new FormData();
      formData.append("price", this.newBidingPrice);

      try {
        const res = await axios.post(`/auctions/${this.$route.params.id}/bids`, formData, {
          headers: {
            withCredentials: true,
          },
        });

        if (res.status === 200) {
          console.log(res.data);
          this.successDialog = true; 
          this.dialog = false; 
          this.setBiddingData(); // 입찰 데이터 새로고침

        } else {
          console.log(res.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
    validateBidPrice() {
      this.errorMessages = [];
      this.isBidPriceValid = true;

      if (this.newBidingPrice <= this.biddingData[0].price) {
        this.errorMessages.push(`입찰가는 현재 입찰가(${this.biddingData[0].price})보다 커야 합니다.`);
        this.isBidPriceValid = false;
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
    showBidHistory(){
      this.selectedMenu = 'bidHistory';
    },
    showAuctionDescription(){
      this.selectedMenu = 'description';
    }
  },
  mounted() {
    this.setAuctionData();
    this.setBiddingData();
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

