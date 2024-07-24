<!-- 헤더 -->
<!-- 작성자: 이주윤 -->

<template>
    <v-app-bar app flat>
        <v-img src="@/assets/team-logo.png" max-height="60" max-width="200" contain class="mr-10"></v-img>

        <v-btn text>
            Category
            <v-icon>mdi-chevron-down</v-icon>
        </v-btn>

        <v-spacer></v-spacer>

        <v-text-field label="검색" hide-details="true" append-icon="mdi-magnify" style="max-width: 300px"></v-text-field>

        <v-btn icon class="ml-4">
            <v-icon>mdi-chat-outline</v-icon>
        </v-btn>

        <v-btn icon class="ml-4">
            <v-icon>mdi-heart-outline</v-icon>
        </v-btn>

        <v-btn icon class="ml-4">
            <v-icon>mdi-account-circle-outline</v-icon>
        </v-btn>

        <v-btn class="ml-4" dark rounded> Login </v-btn>
        <v-btn class="ml-4" dark rounded> Logout </v-btn>
        <v-btn class="ml-4" dark rounded> Sign in </v-btn>
    </v-app-bar>
</template>

<script>
export default {};
</script>

<style scoped></style>
