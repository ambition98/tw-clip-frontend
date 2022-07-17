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
                cnt: {{ getCnt() }},
                len: {{ getLen() }}
                period: {{ this.period }}
                <v-row v-if="isLoaded" justify="center">
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
            first: 2,
            periodArr: ['week', 'month', 'quarter']
        }
    },
    props: ['period'],
    setup() {},
    created() {
        this.requestClips()
    },
    computed: {
        isLoaded() {
            // return this.$store.getters.getHotclipLoadedCnt
            return this.getCnt() === this.getLen() * this.first * this.periodArr.length
        }
    },
    methods: {
        requestClips() {
            // const loadedCnt = this.getCnt()
            const endedAt = this.getYmd(new Date())
            let reqCnt = 0
            let resvCnt = 0
            // console.log('cnt: ' + loadedCnt)
            this.periodArr.forEach(p => {
                const startedAt = this.getStartedYmd(p)
                console.log('startedAt: ' + startedAt + ', endedAt: ' + endedAt)

                this.$store.getters.getIsedolLogins.forEach(login => {
                    console.log('reqCnt: ' + ++reqCnt)
                    this.$axios.get('/api/twitch/clips', {
                        params: {
                            login: login,
                            first: this.first,
                            startedAt: startedAt,
                            endedAt: endedAt
                        }
                    }).then(res => {
                        console.log('recvCnt: ' + ++resvCnt)
                        res.data.dto.clips.forEach(clip => {
                            this.pushClip(clip, p)
                        })
                        this.increseCnt()
                    }).catch(error => {
                        console.log('err: ' + error)
                    })
                })
            })
        },
        getStartedYmd(period) {
            const now = new Date()
            const startedDate = new Date()

            if (period === 'week') {
                startedDate.setDate(now.getDate() - 7)
            } else if (period === 'month') {
                startedDate.setMonth((now.getMonth() + 1) - 2)
            } else {
                startedDate.setMonth((now.getMonth() + 1) - 4)
            }

            return this.getYmd(startedDate)
        },
        getYmd(date) {
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
        },
        getLen() {
            return this.$store.getters.getIsedolLogins.length
        },
        getCnt() {
            return this.$store.getters.getHotclipLoadedCnt
        },
        getHotclips() {
            return this.$store.getters.getHotclips(this.period)
        },
        pushClip(clip, period) {
            const payload = {
                period: period,
                clip: clip
            }
            this.$store.dispatch('pushClip', payload)
        },
        increseCnt() {
            this.$store.dispatch('increseHotClipLoadedCnt')
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
