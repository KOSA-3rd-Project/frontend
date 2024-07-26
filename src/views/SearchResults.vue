<template>
    <div class="search-results">
        <h1>검색 결과: {{ $route.query.q }}</h1>
        <div v-if="searchResults.auctions && searchResults.auctions.length">
            <v-container>
                <v-row>
                    <v-col v-for="auction in searchResults.auctions" :key="auction.auctionId" cols="12" sm="6" md="4" lg="3">
                        <v-card>
                            <v-img :src="auction.url || 'path/to/default/image.jpg'" height="200px" cover></v-img>
                            <v-card-title>{{ auction.itemName }}</v-card-title>
                            <v-card-text>
                                <p>시작가: {{ auction.startPrice.toLocaleString() }}원</p>
                                <p>최고 입찰가: {{ auction.highestBid.toLocaleString() }}원</p>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn color="primary" text :to="`/auction/${auction.auctionId}`"> 자세히 보기 </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
            <div class="text-center mt-4">
                <v-pagination v-model="currentPage" :length="searchResults.totalPages" @input="changePage"></v-pagination>
            </div>
        </div>
        <div v-else>검색 결과가 없습니다.</div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'SearchResults',
    data() {
        return {
            currentPage: 1,
        };
    },
    computed: {
        ...mapState('search', ['searchResults']),
    },
    methods: {
        changePage(page) {
            // 페이지 변경 시 새로운 검색 요청을 보냅니다.
            this.$store.dispatch('search/searchAuctions', {
                query: this.$route.query.q,
                page: page,
            });
        },
    },
    mounted() {
        // 컴포넌트가 마운트될 때 검색을 수행합니다.
        this.$store.dispatch('search/searchAuctions', {
            query: this.$route.query.q,
            page: this.currentPage,
        });
    },
};
</script>
