<template>
    <div>
        <v-item-group class="hotclip-container">
            <v-container>
                <!-- <v-row class="hotclip-top">
                    <router-link to="/hotclips" class="router-link">
                        <div>
                            <span class="hotclip-title">주간 핫클립</span>
                            <span class="hotclip-more">
                                더보기
                            </span>
                            <v-icon style="position: relative; bottom: 4px; right: 9px">
                                mdi-chevron-right
                            </v-icon>
                        </div>
                    </router-link>
                </v-row> -->
                {{ getCnt(this.period) }}
                {{ getLen() }}
                {{ this.period }}
                <v-row v-if="getCnt() != getLen()" justify="center">
                    <v-col v-for="n in 12" :key="n" align-self="start" md="3">
                        <SkeletonLoader />
                    </v-col>
                </v-row>
                <v-row v-else>
                    <v-col v-for="clip in getHotclips()" :key="clip.id" align-self="start" md="3">
                        <v-img
                            :src="clip.thumbnailUrl"
                        ></v-img>
                        {{ clip.viewCount }}
                        {{ clip.title }}
                        {{ clip.createdAt }}
                        {{ clip.duration }}
                    </v-col>
                </v-row>
            </v-container>
        </v-item-group>
        <!-- <v-item-group class="hotclip-container">
            <v-container>
                <v-row>
                    월간 핫클립 . 더보기
                </v-row>
                <v-row v-if="this.$hotClipsLoadedCount != this.$broadcasterLogin.length" justify="center">
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
        </v-item-group> -->
    </div>
</template>
<script>
import SkeletonLoader from '@/components/SkeletonLoader.vue'

export default {
    components: {
        SkeletonLoader
    },
    data() {
        return {
            // sortedWeek: false,
            // sortedMonth: false,
            // sorted: false
            // period: ['week', 'month', 'quarter']
        }
    },
    props: ['first', 'period'],
    setup() {},
    created() {
        this.requestClips('week')
        this.requestClips('month')
        this.requestClips('quarter')
    },
    computed: {
        // getLen() {
        //     return this.$store.getters.getIsedolLogins().length
        // },
        // getCnt(period) {
        //     return this.$store.getters.getHotClipCnt(period)
        // },
        // getHotclips(period) {
        //     return this.$store.getters.getHotClips(period)
        // }
        // getWeekCnt() {
        //     return this.$store.getters.getWeekHotclipLoadedCnt
        // },
        // getWeekClips() {
        //     return this.$store.getters.getWeekHotclips
        // },
        // getMonthCnt() {
        //     return this.$store.getters.getMonthHotclipLoadedCnt
        // },
        // getMonthClips() {
        //     return this.$store.getters.getMonthHotclips
        // },
        // getQuarterCnt() {
        //     return this.$store.getters.getQuarterHotclipLoadedCnt
        // },
        // getQuarterClips() {
        //     return this.$store.getters.getQuarterHotclips
        // }
    },
    methods: {
        getLen() {
            return this.$store.getters.getIsedolLogins.length
        },
        getCnt() {
            return this.$store.getters.getHotClipCnt(this.period)
        },
        getHotclips() {
            return this.$store.getters.getHotClips(this.period)
        },
        requestClips(period) {
            const loadedCnt = this.getCnt(period)
            console.log(period + ' cnt: ' + loadedCnt)
            if (loadedCnt === 6) {
                return
            }

            const startedDate = new Date()
            const endedDate = new Date()
            const nowYear = endedDate.getFullYear()
            const nowMonth = endedDate.getMonth() + 1
            const nowDate = endedDate.getDate()
            const endedAt = nowYear + '-' + nowMonth + '-' + nowDate

            if (period === 'week') {
                startedDate.setDate(nowDate - 7)
            } else if (period === 'month') {
                startedDate.setMonth(nowMonth - 2)
            } else {
                startedDate.setMonth(nowMonth - 4)
            }
            const startedAt = startedDate.getFullYear() + '-' + (startedDate.getMonth() + 1) + '-' + startedDate.getDate()
            console.log('startedAt: ' + startedAt + ', endedAt: ' + endedAt)
            if (loadedCnt !== 6) {
                this.$store.getters.getIsedolLogins.forEach(e => {
                    this.$axios.get('/api/twitch/clips', {
                        params: {
                            login: e,
                            first: this.first,
                            startedAt: startedAt,
                            endedAt: endedAt
                        }
                    }).then(res => {
                        res.data.dto.clips.forEach(e => {
                            this.pushClip(e, period)
                        })
                        this.increseCnt(period)
                    }).catch(error => {
                        console.log('err: ' + error)
                    })
                })
            }
        },
        pushClip(clip, period) {
            this.$store.dispatch('pushClip', clip, period)
        },
        increseCnt(period) {
            this.$store.dispatch('increseHotClipLoadedCnt', period)
        }
    }
}
</script>
<style scoped>
.hotclip-container {
    margin-top: 70px;
}
.hotclip-top {
    border-bottom: 1px soild black;
}
.hotclip-title {
    font-size: 1.2rem;
    font-weight: bold;
}
.hotclip-more {
    margin-left: 10px;
    position: relative;
    bottom: 2px;
}
.router-link {
    color: black;
}
</style>
