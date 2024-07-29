<!-- 헤더 -->
<!-- 작성자: 이주윤 -->
<!-- TODO: 로그인 상태에 따른 아이콘 변경 -->
<template>
    <v-app-bar class="pl-10 pr-10" flat fixed>
        <router-link to="/">
            <v-img src="@/assets/team-logo.png" max-height="60" max-width="200" contain class="mr-10"></v-img>
        </router-link>

        <v-select
            :items="categoryOptions"
            label="Category"
            dense
            hide-details
            solo
            flat
            background-color="rgba(245,245,245,1)"
            style="max-width: 150px"
            @change="onCategorySelect"
        ></v-select>

        <v-spacer></v-spacer>

        <v-text-field
            v-model="searchQuery"
            rounded
            outlined
            dense
            label="검색"
            hide-details="true"
            append-icon="mdi-magnify"
            @click:append="search"
            @keyup.enter="search"
            style="max-width: 300px"
        >
        </v-text-field>

        <v-btn icon class="ml-4">
            <v-icon>mdi-chat-outline</v-icon>
        </v-btn>

        <v-btn icon class="ml-4">
            <v-icon>mdi-heart-outline</v-icon>
        </v-btn>

        <v-btn icon class="ml-4">
            <v-icon>mdi-account-circle-outline</v-icon>
        </v-btn>

        <v-btn class="ml-4" to="/signin" v-if="!member_info.login_check" dark rounded> Login </v-btn>
        <v-btn class="ml-4" v-if="member_info.login_check" dark rounded> Logout </v-btn>
        <v-btn class="ml-4" to="/signup" v-if="!member_info.login_check" dark rounded> Sign in </v-btn>
    </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            searchQuery: '',
            categoryOptions: [
                { text: '패션', value: '패션' },
                { text: '가전', value: '가전' },
                { text: '스포츠', value: '스포츠' },
                { text: '수집품', value: '수집품' },
            ],
        };
    },
    computed: {
        ...mapGetters({ member_info: 'member/getMemberInfo' }),
    },
    methods: {
        async search() {
            try {
                // Spring 백엔드로 검색 요청
                const response = await this.$axios.get(`/search?`, {
                    params: {
                        q: this.searchQuery.trim(),
                    },
                });

                // 검색 결과를 Vuex store에 저장
                this.$store.commit('search/setSearchResults', response.data);

                // 현재 경로가 '/search'인 경우 $router.push 대신 $router.replace 사용
                const routeOptions = {
                    path: '/search',
                    query: { q: this.searchQuery.trim() },
                };

                if (this.$route.path === '/search') {
                    await this.$router.replace(routeOptions);
                } else {
                    await this.$router.push(routeOptions);
                }

                // SearchResults 컴포넌트의 검색 메서드 호출
                if (this.$root.$refs.searchResults) {
                    this.$root.$refs.searchResults.performSearch();
                }
            } catch (error) {
                console.error('검색 중 오류 발생: ', error);
            }
        },

        async onCategorySelect(category) {
            try {
                // URL 인코딩된 카테고리 값 생성
                const encodedCategory = encodeURIComponent(category);

                // Spring 백엔드로 카테고리 검색 요청
                const response = await this.$axios.get(`/search`, {
                    params: {
                        q: '',
                        category: encodedCategory,
                    },
                });

                // 검색 결과를 Vuex store에 저장
                this.$store.commit('search/setSearchResults', response.data);

                // 검색 결과 페이지로 라우팅
                await this.$router.push({
                    path: '/search',
                    query: { category: category },
                });

                // SearchResults 컴포넌트의 검색 메서드 호출
                if (this.$root.$refs.searchResults) {
                    this.$root.$refs.searchResults.performSearch();
                }
            } catch (error) {
                console.error('카테고리 검색 중 오류 발생: ', error);
            }
        },
    },
};
</script>

<style scoped></style>
