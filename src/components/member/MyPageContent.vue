<template>
    <div div class="container">
        <base-title title="마이페이지"></base-title>

        <div class="radio-group">
            <base-radio-button label="내 정보 수정하기" targetValue="1" v-model="test" width="390px"></base-radio-button>
            <base-radio-button label="나의 경매 물품" targetValue="2" v-model="test" width="390px"></base-radio-button>
            <base-radio-button label="나의 입찰 내역" targetValue="3" v-model="test" width="390px"></base-radio-button>
        </div>

        <div v-if="test === '1'">
            <member-info></member-info>
        </div>
    </div>
</template>

<script>
import BaseRadioButton from './atoms/BaseRadioButton.vue';
import BaseTitle from './atoms/BaseTitle.vue';
import MemberInfo from './MemberInfo.vue';

export default {
    components: { BaseTitle, BaseRadioButton, MemberInfo },
    data() {
        return {
            test: '1',
        };
    },
};
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.radio-group {
    display: flex;
    justify-content: space-between;
    width: 1200px;
}
</style>
