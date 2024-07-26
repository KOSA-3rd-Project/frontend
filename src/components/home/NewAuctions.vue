<template>
    <div class="carousel-container">
        <v-divider class="mt-6 mb-2 mx-auto" style="width: 1000px"></v-divider>
        <h2 style="text-align: center">새로 등록된 경매</h2>
        <v-carousel hide-delimiters show-arrows-on-hover height="auto" style="width: 1000px; margin: 0 auto">
            <v-carousel-item v-for="(group, index) in auctionGroups" :key="index">
                <v-container>
                    <v-row>
                        <v-col v-for="item in group" :key="item.auctionId" cols="12" sm="6" md="3">
                            <v-card>
                                <v-img src="@/assets/logo.png" height="200px" contain></v-img>
                                <v-card-title>{{ item.itemName }}</v-card-title>
                                <v-card-text>
                                    <div class="d-flex justify-space-between mb-1 price-info">
                                        <div class="price-label">시작 가격:</div>
                                        <div class="price-value">{{ formatPrice(item.startPrice) }} 원</div>
                                    </div>
                                    <div class="d-flex justify-space-between price-info">
                                        <div class="price-label">입찰 가격:</div>
                                        <div class="price-value">{{ formatPrice(item.highestBid) }} 원</div>
                                    </div>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-carousel-item>
        </v-carousel>
    </div>
</template>

<script>
export default {
    name: 'NewAuctions',
    data() {
        return {
            newAuctions: {},
        };
    },

    mounted() {
        this.getNewAuctions();
    },

    computed: {
        auctionGroups() {
            const groups = [];
            for (let i = 0; i < this.newAuctions.length; i += 4) {
                groups.push(this.newAuctions.slice(i, i + 4));
            }
            return groups;
        },
    },

    methods: {
        getNewAuctions() {
            this.$axios
                .get('/auctions/new')
                .then((res) => {
                    this.newAuctions = res.data.auctions;

                    console.log('서버 메시지: ', res.data.message);
                })
                .catch((err) => {
                    console.err('getNewAuctions() 실행 중 에러 발생: ', err);
                    alert('getNewAuctions() 실행 중 에러 발생: ', err.message);
                });
        },

        formatPrice(price) {
            return price.toLocaleString('ko-KR');
        },
    },
};
</script>

<style scoped>
.price-info {
    font-size: 14px;
}
.price-label {
    color: black;
}
.price-value {
    font-weight: bold;
    color: black;
}
</style>
