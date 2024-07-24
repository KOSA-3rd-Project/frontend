<!-- 홈페이지 -->
<!-- 작성자: 이주윤 -->

<template>
    <v-card v-if="monthlyAuction.auctionId" class="mt-6 mx-auto" max-width="1000">
        <v-row no-gutters>
            <v-col cols="12" md="6">
                <v-card-title class="text-h5 font-weight-bold"> Deals of the Month </v-card-title>
                <v-card-title>
                    {{ monthlyAuction.itemName }}
                </v-card-title>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>시작 가격</v-list-item-title>
                        <v-list-item-subtitle>{{ formatPrice(monthlyAuction.startPrice) }}원</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>현재 가격</v-list-item-title>
                        <v-list-item-subtitle>{{ formatPrice(monthlyAuction.highestBid) }}원</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-row justify="center" class="my-4">
                    <v-col v-for="(time, index) in remainingTime" :key="index" cols="auto">
                        <v-card outlined class="text-center pa-2" min-width="70">
                            <div class="text-h5">{{ time.value }}</div>
                            <div class="caption">{{ time.label }}</div>
                        </v-card>
                    </v-col>
                </v-row>
                <v-card-actions>
                    <v-btn block color="black" dark @click="viewProduct"> 제품 보러가기 → </v-btn>
                </v-card-actions>
            </v-col>
            <v-col cols="12" md="6" class="d-flex align-center justify-center">
                <v-img src="@/assets/logo.png" alt="Auction Item Image" class="rounded-lg" contain max-height="400" max-width="400"></v-img>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
export default {
    name: 'AuctionOfTheMonth',
    data() {
        return {
            monthlyAuction: {},
            remainingTime: [
                { value: 0, label: 'Days' },
                { value: 0, label: 'Hours' },
                { value: 0, label: 'Mins' },
                { value: 0, label: 'Secs' },
            ],
            timer: null,
        };
    },

    mounted() {
        this.getMonthlyAuction();
    },

    methods: {
        getMonthlyAuction() {
            this.$axios
                .get('/api/auctions/month')
                .then((res) => {
                    this.monthlyAuction = res.data;
                    this.startTimer();
                })
                .catch((err) => {
                    console.error('getMonthlyAuction() 실행 중 에러 발생:', err);
                    alert(err.message);
                });
        },
        formatPrice(price) {
            return price.toLocaleString('ko-KR');
        },
        viewProduct() {
            console.log('View product:', this.monthlyAuction.auctionId);
        },
        startTimer() {
            this.updateRemainingTime();
            this.timer = setInterval(this.updateRemainingTime, 1000);
        },
        updateRemainingTime() {
            const now = new Date();
            const dueDate = new Date(this.monthlyAuction.dueDate);
            const diff = dueDate - now;

            if (diff <= 0) {
                clearInterval(this.timer);
                this.remainingTime = this.remainingTime.map((time) => ({ ...time, value: 0 }));
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            this.remainingTime = [
                { value: days, label: 'Days' },
                { value: hours, label: 'Hours' },
                { value: minutes, label: 'Mins' },
                { value: seconds, label: 'Secs' },
            ];
        },
    },

    beforeDestroy() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    },
};
</script>

<style scoped>
.v-image {
    width: 100%;
    height: 100%;
}
</style>
