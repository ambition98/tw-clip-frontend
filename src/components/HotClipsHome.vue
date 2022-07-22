<template>
    <div>
        <v-item-group class="hotclip-container">
            <v-container>
                cnt: {{ getCnt() }},
                len: {{ getLen() }}
                period: {{ this.period }}
                <v-row v-if="!isLoaded" justify="center">
                        <ProgressCircular />
                    <!-- <v-col v-for="n in 12" :key="n" align-self="start" md="3">
                        <SkeletonLoader />
                    </v-col> -->
                </v-row>
                <v-row v-else>
                    <v-col v-for="clip in getHotclips()" :key="clip.id" align-self="start" md="3" class="clip-container">
                        <v-hover v-slot="{ hover }">
                            <v-card :elevation="hover ? 16 : 2">
                                <span class="duration clip-info">{{ getDuration(clip) }}</span>
                                <v-img :src="clip.thumbnailUrl" @click="openModal(clip.embedUrl)" class="clip-img" />
                                <span class="view-count clip-info">{{ getViewCount(clip) }}</span>
                                <span class="created-at clip-info">{{ getCreatedAt(clip) }}</span>
                            </v-card>
                        </v-hover>
                        <span class="b-name" @click="moveToBroadcasterPage(clip)">{{ clip.broadcasterName }}</span>
                        <span class="clip-title">{{ getTitle(clip) }}</span>
                    </v-col>
                </v-row>
            </v-container>
        </v-item-group>
        <v-dialog
            v-model="modal"
            width="1200px"
        >
            <v-card>
                <iframe :src="embedUrl" width="100%" height="600" />

                <v-divider></v-divider>

                <div>
                    원본동영상 |
                    <span @click="copied">주소 복사</span> |
                    카테고리 추가
                </div>
            </v-card>
            <v-snackbar
                :timeout="2000"
                v-model="snackbar"
            >
                {{ snackbarText }}

                <template v-slot:action="{ attrs }">
                    <v-btn
                        color="pink"
                        text
                        v-bind="attrs"
                        @click="snackbar = false"
                    >
                        Close
                    </v-btn>
                </template>
            </v-snackbar>
        </v-dialog>
    </div>
</template>
<script>
// import SkeletonLoader from '@/components/SkeletonLoader.vue'
import ProgressCircular from '@/components/ProgressCircular.vue'

export default {
    components: {
        // SkeletonLoader
        ProgressCircular
    },
    data() {
        return {
            first: 4,
            periodArr: ['week', 'month', 'quarter'],
            message: '',
            modal: false,
            embedUrl: '',
            snackbar: false,
            snackbarText: 'asdf'
        }
    },
    props: ['period'],
    setup() {},
    created() {
        if (!this.isLoaded) {
            this.requestClips()
        }
    },
    computed: {
        isLoaded() {
            const loaded = this.getCnt() === this.getLen() * this.periodArr.length
            if (loaded) {
                this.$store.dispatch('sortHotclip')
                return true
            } else {
                return false
            }
        }
    },
    methods: {
        requestClips() {
            const endedAt = this.getYmd(new Date())
            this.periodArr.forEach(p => {
                const startedAt = this.getStartedYmd(p)

                this.$store.getters.getIsedolId.forEach(id => {
                    this.$axios.get('/api/twitch/clips', {
                        params: {
                            broadcasterId: id,
                            first: this.first,
                            startedAt: startedAt,
                            endedAt: endedAt
                        }
                    }).then(res => {
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
        getDuration(clip) {
            const duration = Math.round(clip.duration)
            if (duration < 10) {
                return '0:0' + duration
            } else if (duration < 60) {
                return '0:' + duration
            } else {
                return '1:00'
            }
        },
        getViewCount(clip) {
            const viewCount = clip.viewCount
            const str = viewCount.toString()
            let unit = ''
            let i = ''
            if (viewCount < 10000) {
                return viewCount.toLocaleString('ko-KR') + '회 시청'
            } else if (viewCount < 100000000) {
                i = str.length - 4
                unit = '만 회 시청'
            } else {
                i = str.length - 8
                unit = '억 회 시청'
            }

            const front = str.substring(0, i).toLocaleString('ko-KR')
            const end = str.substring(i, i + 1)

            return front + '.' + end + unit
        },
        getCreatedAt(clip) {
            const createdAt = clip.createdAt

            return createdAt
        },
        getTitle(clip) {
            const title = clip.title

            return title
        },
        moveToBroadcasterPage(clip) {
            this.$router.push({
                name: 'broadcaster',
                params: {
                    id: clip.broadcasterId,
                    name: clip.broadcasterName
                }
            })
        },
        openModal(url) {
            console.log(url)
            this.embedUrl = url + '&parent=isedol-clip.xyz'
            this.modal = true
        },
        copied() {
            this.$copyText(this.embedUrl)
            this.snackbarText = '복사되었습니다.'
            this.snackbar = true
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
.clip-img {
    margin-bottom: 5px;
    cursor: pointer;
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
.clip-container {
    position: relative;
}
.clip-info {
    position: absolute;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    z-index: 1;
    padding: 2px 6px;
    border-radius: 10px;
}
.duration {
    top: 10px;
    left: 10px;
}
.view-count {
    bottom: 10px;
    left: 10px;
}
.created-at {
    bottom: 10px;
    right: 10px;
}
.b-name {
    font-weight: bold;
    font-size: 1.08rem;
    margin-right: 5px;
    cursor: pointer;
    color: purple;
}
</style>
