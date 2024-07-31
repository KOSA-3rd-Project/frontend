<template>
    <div>
        <v-tab href="#mobile-tabs-5-1">{{ title }}</v-tab>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: 'Title',
        },
    },
};
</script>

<style scoped></style>
