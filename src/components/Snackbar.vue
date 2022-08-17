<template>
    <v-snackbar
        timeout="2000"
        v-model="open"
        rounded="pill"
        elevation="15"
    >
            {{ $props.text }}
    </v-snackbar>
</template>
<script>
export default {
    name: 'Snackbar',
    components: {},
    data() {
        return {
            open: ''
        }
    },
    props: ['text', 'snackbar'],
    watch: {
        open: function() {
            if (this.open === false) {
                this.$emit('close')
            }
        }
    },
    created() {
        this.open = this.snackbar
    }
}
</script>
