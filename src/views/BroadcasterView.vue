<template>
    <div>
        {{ user }}
    </div>
</template>
<script>
export default {
    components: {},
    data() {
        return {
            user: ''
        }
    },
    created() {
        this.$axios.get('/twitch/users', {
            params: {
                id: this.$route.params.id
            }
        }).then(res => {
            console.log(res.data)
            this.user = res.data.dto[0]
        })
    },
    methods: {}
}
</script>
