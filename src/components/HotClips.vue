<template>
    <div>
        <!-- <v-container>
            <v-row justify="center" align="center">
                <v-col>
                    주간 핫클립
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    클립목록
                </v-col>
            </v-row>
        </v-container>
        <v-container>
            <v-row justify="center" align="center">
                <v-col>
                    월간 핫클립
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    클립목록
                </v-col>
            </v-row>
        </v-container> -->
        <v-item-group>
            <v-container>
                <v-row>
                    주간 핫클립 . 더보기 {{data}}
                    <button @click="getClips">클립 받기</button>
                </v-row>
                <v-row v-if="loading" justify="center">
                    <ProgressCircular />
                </v-row>
                <v-row v-else>
                    <v-col v-for="n in 16" :key="n" align-self="start" md="3">
                        <v-img
                            src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                        ></v-img>
                        조회수:
                    </v-col>
                </v-row>
            </v-container>
    </v-item-group>
    </div>
</template>
<script>
import ProgressCircular from '@/components/ProgressCircular.vue'

export default {
    components: {
        ProgressCircular
    },
    data() {
        return {
            loading: true,
            broadcasterId: [702754423, 237570548, 169700336, 203667951, 707328484, 195641865],
            cursor: [],
            clips: [],
            data: 'data'
        }
    },
    setup() {},
    created() {},
    mounted() {
        console.log('mounted')
    },
    unmounted() {},
    methods: {
        getClips() {
            const url = 'http://danyleee.com/api/twitch/clips'
            // this.broadcasterId.forEach(e => {
            //     this.axios.get(url, { params: { broadcasterId: e, first: 10 } })
            // }).then(res => {
            //     console.log('res: ' + res.status)
            //     this.data = res.data
            // }).catch(error => {
            //     console.log('err: ' + error)
            // })
            this.axios.get(url, { params: { broadcasterId: 702754423, first: 10 } })
            .then(res => {
                console.log('status: ' + res.status)
                console.log('res: ' + res.data)
            })
        }
    }
}
</script>
