<!-- SearchResults.vue -->

<template>
    <v-container fluid>
        <v-row>
            <!-- 왼쪽 필터링 메뉴 -->
            <v-col cols="3">
                <v-card>
                    <v-card-title>필터</v-card-title>
                    <v-card-text>
                        <v-expansion-panels multiple flat>
                            <v-expansion-panel>
                                <v-expansion-panel-header>카테고리</v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <v-radio-group v-model="selectedCategory">
                                        <v-radio label="패션" value="패션"></v-radio>
                                        <v-radio label="가전" value="가전"></v-radio>
                                        <v-radio label="스포츠" value="스포츠"></v-radio>
                                        <v-radio label="수집품" value="수집품"></v-radio>
                                    </v-radio-group>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                            <v-expansion-panel>
                                <v-expansion-panel-header>상태</v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <v-radio-group v-model="selectedCondition">
                                        <v-radio label="미개봉" value="미개봉"></v-radio>
                                        <v-radio label="새상품" value="새상품"></v-radio>
                                        <v-radio label="중고 상품" value="중고"></v-radio>
                                    </v-radio-group>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                            <v-expansion-panel>
                                <v-expansion-panel-header>가격</v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <v-row>
                                        <v-col cols="6">
                                            <v-text-field v-model="minPrice" label="최소 가격" type="number" prefix="₩" hide-details dense outlined></v-text-field>
                                        </v-col>
                                        <v-col cols="6">
                                            <v-text-field v-model="maxPrice" label="최대 가격" type="number" prefix="₩" hide-details dense outlined></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-card-text>
                </v-card>
            </v-col>

            <!-- 오른쪽 검색 결과 -->
            <v-col cols="9">
                <h1>검색 결과: {{ $route.query.q }}</h1>
                <v-row align="center">
                    <v-col cols="6">
                        <p class="mb-0 grey--text text--darken-1">총 {{ searchResults.totalCount }}개의 검색 결과</p>
                    </v-col>
                    <v-col cols="6" class="text-right">
                        <v-select
                            v-model="selectedSort"
                            :items="sortOptions"
                            label="정렬"
                            dense
                            outlined
                            hide-details
                            solo
                            flat
                            style="max-width: 200px; margin-left: auto"
                        ></v-select>
                    </v-col>
                </v-row>
                <v-row v-if="searchResults.auctions && searchResults.auctions.length">
                    <v-col v-for="auction in searchResults.auctions" :key="auction.auctionId" cols="12" sm="6" md="4">
                        <v-card>
                            <v-img :src="auction.url || '/path/to/default/image.jpg'" height="200px" contain></v-img>
                            <v-card-title>{{ auction.itemName }}</v-card-title>
                            <v-card-text>
                                <p>시작가: {{ auction.startPrice.toLocaleString() }}원</p>
                                <p>최고 입찰가: {{ auction.highestBid.toLocaleString() }}원</p>
                            </v-card-text>
                            <v-card-actions class="mt-n7">
                                <v-btn color="primary" text :to="`/auction/${auction.auctionId}`">자세히 보기</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
                <div v-else>검색 결과가 없습니다.</div>
                <v-pagination v-model="currentPage" :length="searchResults.totalPages" :total-visible="5" @input="changePage" class="mt-4"></v-pagination>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'SearchResults',
    data() {
        return {
            currentPage: 1,
            selectedCategory: null,
            selectedCondition: null,
            minPrice: '',
            maxPrice: '',
            selectedSort: '최신순',
            sortOptions: [
                { text: '최신순', value: 'latest' },
                { text: '인기순', value: 'popular' },
                { text: '낮은가격순', value: 'lowPrice' },
                { text: '높은가격순', value: 'highPrice' },
            ],
        };
    },
    computed: {
        ...mapState('search', ['searchResults', 'searchParams']),
    },
    methods: {
        ...mapActions('search', ['searchAuctions', 'setSearchParams']),

        changePage(page) {
            this.setSearchParams({ ...this.setSearchParams, page });
            this.$router.push({ query: { ...this.$route.query, page } });
        },
        async performSearch() {
            await this.searchAuctions(this.searchParams);
        },
    },
    watch: {
        searchParams: {
            handler() {
                this.performSearch();
            },
            deep: true,
        },

        '$route.query': {
            handler(newQuery) {
                //라우트 쿼리가 변경될 때만 검색 파라미터 업데이트
                if (JSON.stringify(this.searchParams) !== JSON.stringify(newQuery)) {
                    this.setSearchParams(newQuery);
                }
            },
            deep: true,
            immediate: true,
        },
        selectedCategory(newCategory) {
            this.setSearchParams({ ...this.searchParams, category: newCategory, page: 1 });
        },
        selectedCondition(newCondition) {
            this.setSearchParams({ ...this.searchParams, condition: newCondition, page: 1 });
        },
        minPrice(newMinPrice) {
            this.setSearchParams({ ...this.searchParams, minPrice: newMinPrice, page: 1 });
        },
        maxPrice(newMaxPrice) {
            this.setSearchParams({ ...this.searchParams, maxPrice: newMaxPrice, page: 1 });
        },
        selectedSort(newSort) {
            this.setSearchParams({ ...this.searchParams, sort: newSort, page: 1 });
        },
    },
    mounted() {
        // $root에서 이 컴포넌트에 접근할 수 있도록 ref 설정
        this.$root.$refs.searchResults = this;
    },
    beforeDestroy() {
        // 컴포넌트가 제거될 때 ref 제거
        if (this.$root.$refs.searchResults === this) {
            this.$root.$refs.searchResults = null;
        }
    },
};
</script>
