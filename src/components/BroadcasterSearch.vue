<template>
    <div class="search-container">
        <v-row justify="center" align="center">
            <v-col sm="5">
            <!-- <v-row align="center"> -->
                <!-- <v-layout row wrap align-center> -->
                <v-text-field
                    v-model="keyword"
                    solo
                    label="스트리머 검색"
                    clearable
                    @keydown.enter="search"
                ></v-text-field>
                <!-- </v-layout> -->
            <!-- </v-row> -->
            </v-col>
        </v-row>
    </div>
</template>
<script>
export default {
    name: 'MainSearch',
    props: ['k'],
    created() {
        this.keyword = this.k
    },
    data() {
        return {
            keyword: ''
        }
    },
    methods: {
        search() {
            this.$router.push({
                name: 'search',
                query: {
                    keyword: this.keyword.trim()
                }
            })
        }
    }
}
</script>
<style scoped>
.search-container {
    margin-top: 70px;
}
</style>
