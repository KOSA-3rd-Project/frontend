<!-- 헤더 -->
<!-- 작성자: 이주윤 -->
<!-- TODO: 로그인 상태에 따른 아이콘 변경 -->
<template>
    <v-app-bar class="pl-10 pr-10" flat fixed>
        <router-link to="/">
            <v-img src="@/assets/team-logo.png" max-height="60" max-width="200" contain class="mr-10"></v-img>
        </router-link>

        <v-btn text>
            Category
            <v-icon>mdi-chevron-down</v-icon>
        </v-btn>

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

        <v-btn icon class="ml-4" v-if="isLogIn">
            <v-icon>mdi-chat-outline</v-icon>
        </v-btn>

        <v-btn icon class="ml-4" v-if="isLogIn">
            <v-icon>mdi-heart-outline</v-icon>
        </v-btn>

        <v-btn icon class="ml-4" to="/my-page" v-if="isLogIn">
            <v-icon>mdi-account-circle-outline</v-icon>
        </v-btn>

        <v-btn class="ml-4" to="/signin" v-if="!isLogIn" dark rounded> Login </v-btn>
        <v-btn class="ml-4" to="/" v-if="isLogIn" @click="logout" dark rounded> Logout </v-btn>
        <v-btn class="ml-4" to="/signup" v-if="!isLogIn" dark rounded> Sign in </v-btn>
    </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            searchQuery: '',
        };
    },
    computed: {
        ...mapGetters({ access_token: 'member/getAccessToken' }),
        isLogIn() {
            return !!this.access_token;
        },
    },

    methods: {
        async search() {
            if (this.searchQuery.trim()) {
                try {
                    // Spring 백엔드로 검색 요청
                    const response = await this.$axios.get(`/search?q=${this.searchQuery}`);

                    // 검색 결과를 Vuex store에 저장
                    this.$store.commit('search/setSearchResults', response.data);

                    // 현재 경로가 '/search'인 경우 $router.push 대신 $router.replace 사용
                    if (this.$route.path === '/search') {
                        await this.$router.replace({
                            path: '/search',
                            query: { q: this.searchQuery },
                        });
                    } else {
                        await this.$router.push({
                            path: '/search',
                            query: { q: this.searchQuery },
                        });
                    }

                    // SearchResults 컴포넌트의 검색 메서드 호출
                    if (this.$root.$refs.searchResults) {
                        this.$root.$refs.searchResults.performSearch();
                    }
                } catch (error) {
                    console.error('검색 중 오류 발생: ', error);
                }
            }
        },
        logout() {
            this.$store.dispatch('member/logout');
        },
    },
};
</script>

<style scoped></style>
