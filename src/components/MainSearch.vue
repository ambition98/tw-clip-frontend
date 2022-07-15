<template>
    <v-container>
        <v-row justify="center" align="center">
            <v-col sm="5">
            <!-- <v-row align="center"> -->
                <!-- <v-layout row wrap align-center> -->
                <v-text-field
                    v-model="keyword"
                    solo
                    label="스트리머 검색"
                    clearable
                ></v-text-field>
                <!-- </v-layout> -->
            <!-- </v-row> -->
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    name: 'MainSearch',
    components: {},
    data() {
        return {
            keyword: ''
        }
    },
    setup() {},
    created() {},
    mounted() {},
    unmounted() {},
    methods: {}
}
</script>
