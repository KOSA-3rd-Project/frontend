<!-- 헤더 -->
<!-- 작성자: 이주윤 -->
<!-- TODO: 로그인 상태에 따른 아이콘 변경 -->
<template>
    <v-app-bar class="pl-10 pr-10" flat>
        <v-img src="@/assets/team-logo.png" max-height="60" max-width="200" contain class="mr-10"></v-img>

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
        };
    },
    computed: {
        ...mapGetters({ member_info: 'member/getMemberInfo' }),
    },
    methods: {
        search() {
            console.log('검색어:', this.searchQuery);
            // TODO: 검색 로직이나 페이지 이동 로직을 구현
            // 예: this.$router.push(`/search?q=${this.searchQuery}`);
        },
    },
};
</script>

<style scoped></style>
