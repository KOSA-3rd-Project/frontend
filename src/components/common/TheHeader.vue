<template>
    <v-app-bar :elevation="3">
        <template v-slot:prepend>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>Drop The Bid</v-app-bar-title>

        <v-button>
            <b>Category</b>
            <v-icon big>mdi-chevron-down</v-icon>
        </v-button>

        <template v-slot:append>
            <v-btn icon="mdi-heart"></v-btn>

            <v-btn icon="mdi-magnify"></v-btn>

            <v-btn icon="mdi-dots-vertical"></v-btn>
        </template>
    </v-app-bar>
</template>

<script>
export default {};
</script>

<style scoped></style>
