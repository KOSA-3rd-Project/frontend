<!-- 푸터 -->
<!-- 작성자: 이주윤 -->

<template>
    <v-footer app dark padless>
        <v-container class="py-0">
            <v-row dense>
                <v-col cols="12" sm="6">
                    <v-card-text class="py-1 caption"> 조재은(c) | redjoun@naver.com </v-card-text>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-card-text class="py-1 caption"> 이윤빈 | kig0632@naver.com </v-card-text>
                </v-col>
            </v-row>
            <v-row dense>
                <v-col cols="12" sm="6">
                    <v-card-text class="py-1 caption"> 오동건 | o.d.g@kakao.com </v-card-text>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-card-text class="py-1 caption"> 이주윤 | dlwndbs10@gmail.com </v-card-text>
                </v-col>
                <v-divider />
                <v-card-text class="white--text"> {{ new Date().getFullYear() }} — <strong>Drop The Bid</strong> </v-card-text>
            </v-row>
        </v-container>
    </v-footer>
</template>

<script>
export default {};
</script>

<style scoped>
.v-footer {
    min-height: auto;
}
</style>
