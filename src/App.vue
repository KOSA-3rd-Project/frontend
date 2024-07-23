<template>
    <div id="app">
        <the-header />
        <the-content>
            <router-view></router-view>
        </the-content>
        <the-footer />
    </div>
</template>

<script>
import TheHeader from '@/components/common/TheHeader.vue';
import TheFooter from '@/components/common/TheFooter.vue';
import TheContent from '@/components/common/TheContents.vue';

export default {
    name: 'App',

    components: {
        TheHeader,
        TheContent,
        TheFooter,
    },

    data: () => ({
        //
    }),
};
</script>
