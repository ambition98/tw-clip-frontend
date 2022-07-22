<template>
    <div>
        BroadcasterView
        {{ id }}
        {{ name }}
    </div>
</template>
<script>
export default {
    components: {},
    data() {
        return {
            id: '',
            name: ''
        }
    },
    setup() {},
    created() {
        this.id = this.$route.params.id
        this.name = this.$route.params.name
    },
    mounted() {},
    unmounted() {},
    methods: {}
}
</script>
