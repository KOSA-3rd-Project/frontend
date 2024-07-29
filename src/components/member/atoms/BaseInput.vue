<template>
    <div>
        <v-text-field
            class="base-text-field"
            v-model="internalValue"
            :label="label"
            :type="type"
            :rules="rules"
            :autocomplete="autocomplete"
            :style="inputStyles"
            @input="updateValue"
            outlined
        ></v-text-field>
    </div>
</template>

<script scoped>
export default {
    props: {
        label: {
            type: String,
            default: 'label',
        },
        type: {
            type: String,
            default: 'text',
        },
        autocomplete: {
            type: String,
            default: 'on',
        },
        width: {
            type: String,
            default: '400px',
        },
        rules: {
            type: Array,
            default: () => [],
        },
        value: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            internalValue: this.value,
        };
    },
    computed: {
        inputStyles() {
            return {
                width: this.width,
            };
        },
    },
    methods: {
        updateValue(event) {
            this.$emit('input', event);
        },
    },
    watch: {
        value(newVal) {
            this.internalValue = newVal;
        },
    },
};
</script>

<style scoped>
.base-text-field {
    border-radius: 10px;
}
</style>
