<template>
    <div>
        <v-item-group class="hotclip-container">
            <v-container>
                <v-row v-if="loading" justify="center">
                        <ProgressCircular />
                </v-row>
                <v-row v-else>
                    <v-col v-for="clip in hotclips" :key="clip.id" align-self="start" md="3" class="clip-container">
                        <Clip :clip="clip" />
                    </v-col>
                    <InfiniteLoading @infinite="infiniteHandler">
                        <div slot="no-more"></div>
                        <div slot="no-results"></div>
                    </InfiniteLoading>
                </v-row>
            </v-container>
        </v-item-group>
        <ClipModal v-if="modal" :modal="modal" :clip="clip" @close="closeModal" :key="key"/>
    </div>
</template>
<script>
import ClipModal from '@/components/ClipModal.vue'
import InfiniteLoading from 'vue-infinite-loading'
import ProgressCircular from '@/components/ProgressCircular.vue'
import Clip from '@/components/Clip.vue'

export default {
    components: {
        ClipModal,
        InfiniteLoading,
        ProgressCircular,
        Clip
    },
    data() {
        return {
            first: 4,
            periodArr: ['day', 'week', 'month'],
            message: '',
            modal: false,
            snackbar: false,
            snackbarText: '',
            hotclips: [],
            clip: '',
            page: 1,
            key: 1
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
    methods: {
        infiniteHandler($state) {
            this.$axios.get('/storage/hotclips', {
                params: {
                    period: this.period,
                    page: this.page
                }
            }).then(res => {
                if (res.data.dto) {
                    this.page++
                    console.log('/storeage/hotclips:', res.data)
                    res.data.dto.forEach(clip => {
                        this.hotclips.push(clip)
                    })
                    $state.loaded()
                } else {
                    $state.complete()
                }
            })
        },
        closeModal() {
            this.modal = false
            this.key++
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
        goToBroadcasterPage(id) {
            const isedol = this.$store.getters.getIsedolInfo
            this.$router.push({
                name: 'broadcaster',
                params: {
                    id: id,
                    user: isedol[id]
                }
            })
        },
        openModal(clip) {
            this.clip = clip
            this.modal = true
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
.clip-container {
    position: relative;
}
</style>
