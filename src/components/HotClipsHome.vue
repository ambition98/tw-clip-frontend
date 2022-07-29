<template>
    <div>
        <v-item-group class="hotclip-container">
            <v-container>
                cnt: {{ getCnt() }},
                period: {{ this.period }}
                <v-row v-if="loading" justify="center">
                        <ProgressCircular />
                </v-row>
                <v-row v-else>
                    <v-col v-for="clip in hotclips" :key="clip.id" align-self="start" md="3" class="clip-container">
                        <v-hover v-slot="{ hover }">
                            <v-card :elevation="hover ? 16 : 2">
                                <span class="duration clip-info">{{ getDuration(clip) }}</span>
                                <v-img :src="clip.thumbnailUrl" @click="openModal(clip)" class="clip-img" />
                                <span class="view-count clip-info">{{ getViewCount(clip) }}</span>
                                <span class="created-at clip-info">{{ getCreatedAt(clip) }}</span>
                            </v-card>
                        </v-hover>
                        <span class="b-name" @click="moveToBroadcasterPage(clip)">{{ clip.broadcasterName }}</span>
                        <span class="clip-title">{{ getTitle(clip) }}</span>
                    </v-col>
                    <InfiniteLoading @infinite="infiniteHandler"></InfiniteLoading>
                </v-row>
            </v-container>
        </v-item-group>
        <ClipModal v-if="modal" :modal="modal" :clip="clip" @close="modal=false"/>
    </div>
</template>
<script>
import ClipModal from '@/components/ClipModal.vue'
import InfiniteLoading from 'vue-infinite-loading'
import ProgressCircular from '@/components/ProgressCircular.vue'

export default {
    components: {
        ClipModal,
        InfiniteLoading,
        ProgressCircular
    },
    data() {
        return {
            first: 4,
            periodArr: ['week', 'month', 'quarter'],
            message: '',
            modal: false,
            snackbar: false,
            snackbarText: '',
            hotclips: [],
            clip: '',
            page: 1
        }
    },
    props: ['period'],
    created() {
        this.infiniteHandler()
    },
    computed: {
        loading: function() {
            return this.hotclips.length < 1
        }
    },
    watch: {
        period: function() {
            console.log('watch')
            this.$destroy()
        }
    },
    methods: {
        infiniteHandler($state) {
            console.log('page: ' + this.page)
            this.$axios.get('/api/twitch/hotclips', {
                params: {
                    period: this.period,
                    page: this.page
                }
            }).then(res => {
                if (res.data.dto) {
                    this.page++
                    res.data.dto.forEach(clip => {
                        this.hotclips.push(clip)
                    })
                    $state.loaded()
                } else {
                    $state.complete()
                }
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
        openModal(clip) {
            this.clip = clip
            this.modal = true
        },
        getLen() {
            return this.$store.getters.getIsedolLogins.length
        },
        getCnt() {
            return this.$store.getters.getHotclipLoadedCnt
        },
        getHotclips() {
            // return this.$store.getters.getHotclips(this.period)
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
#test {
    width: 50%;
}
</style>
