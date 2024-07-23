<!-- 헤더 -->
<!-- 작성자: 이주윤 -->

<template>
    <v-app-bar :elevation="3">
        <v-container class="pa-0 fill-height">
            <v-row no-gutters align="center" justify="space-between">
                <v-app-bar-title class="text-h6 font-weight-bold mr-10">Drop The Bid</v-app-bar-title>

                <v-btn class="ml-4">
                    <b>Category</b>
                    <v-icon right>mdi-chevron-down</v-icon>
                </v-btn>

                <v-spacer></v-spacer>

                <v-col cols="auto">
                    <v-row no-gutters align="center">
                        <v-text-field label="검색" append-icon="mdi-magnify" hide-details outlined dense class="mr-4" style="max-width: 300px"></v-text-field>

                        <v-btn icon class="mx-1">
                            <v-icon>mdi-chat-outline</v-icon>
                        </v-btn>
                        <v-btn icon class="mx-1">
                            <v-icon>mdi-heart-outline</v-icon>
                        </v-btn>
                        <v-btn icon class="mx-1">
                            <v-icon>mdi-account-circle-outline</v-icon>
                        </v-btn>
                        <v-btn class="ml-2" rounded="xl" dark>Login</v-btn>
                        <v-btn class="ml-2" rounded="xl" dark>Sign Up</v-btn>
                        <v-btn class="ml-2" rounded="xl" dark>Logout</v-btn>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </v-app-bar>
</template>

<script>
export default {};
</script>

<style scoped></style>
