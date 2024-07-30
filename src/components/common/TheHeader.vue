<!-- 헤더 -->
<!-- 작성자: 이주윤 -->
<!-- TODO: 로그인 상태에 따른 아이콘 변경 -->
<template>
    <v-app-bar class="pl-10 pr-10" flat fixed>
        <router-link to="/">
            <v-img src="@/assets/team-logo.png" max-height="60" max-width="200" contain class="mr-10"></v-img>
        </router-link>

        <v-select
            v-model="selectedCategory"
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

        <v-btn icon class="ml-4" v-if="isLogIn">
            <v-icon>mdi-chat-outline</v-icon>
        </v-btn>

        <v-btn icon class="ml-4" v-if="isLogIn">
            <v-icon>mdi-heart-outline</v-icon>
        </v-btn>

        <v-btn icon class="ml-4" v-if="isLogIn">
            <v-icon>mdi-account-circle-outline</v-icon>
        </v-btn>

        <v-btn class="ml-4" to="/signin" v-if="!isLogIn" dark rounded> Login </v-btn>
        <v-btn class="ml-4" v-if="isLogIn" @click="logout" dark rounded> Logout </v-btn>
        <v-btn class="ml-4" to="/signup" v-if="!isLogIn" dark rounded> Sign in </v-btn>
    </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

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
        ...mapGetters({
            access_token: 'member/getAccessToken',
            selectedCategory: 'search/getSelectedCategory',
        }),
        isLogIn() {
            return !!this.access_token;
        },
    },

    methods: {
        ...mapActions({
            setCategory: 'search/setCategory',
            clearCategory: 'search/clearCategory',
            newSearch: 'search/newSearch',
        }),

        async onCategorySelect(category) {
            if (!category) return;
            await this.setCategory(category);
            this.$router.push({ path: '/search', query: { category } });
        },

        async search() {
            await this.newSearch(this.searchQuery.trim());
            this.$router.push({ path: '/search', query: { q: this.searchQuery.trim() } });
        },

        logout() {
            this.$store.dispatch('member/logout');
            this.clearCategory();
        },
    },

    watch: {
        $route(to, from) {
            if (to.path !== '/search' && from.path === '/search') {
                this.clearCategory();
            }
        },
    },
};
</script>

<style scoped></style>
