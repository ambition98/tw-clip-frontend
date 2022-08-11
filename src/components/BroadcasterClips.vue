<template>
    <div>
        <v-item-group class="clips-container">
            <v-container>
                <v-row v-if="!loadedClip" justify="center">
                        <ProgressCircular />
                </v-row>
                <v-row v-else-if="existedClip">
                    <v-col v-for="clip in clips" :key="clip.id" align-self="start" md="3" class="clip-container">
                        <Clip :clip="clip" />
                    </v-col>
                    <InfiniteLoading @infinite="infiniteHandler"></InfiniteLoading>
                </v-row>
                <v-row v-else>
                    해당 기간의 클립이 존재하지 않습니다
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
import Clip from '@/components/Clip.vue'

export default {
    name: 'BroadcasterClips',
    props: ['id', 'startedAt', 'endedAt'],
    components: {
        ClipModal,
        InfiniteLoading,
        ProgressCircular,
        Clip
    },
    data() {
        return {
            message: '',
            modal: false,
            snackbar: false,
            snackbarText: '',
            clips: [],
            loadedClip: false,
            clip: '',
            cursor: ''
        }
    },
    created() {
        console.log(this.id)
        console.log(this.startedAt)
        console.log(this.endedAt)
        this.infiniteHandler()
    },
    computed: {
        existedClip: function() {
            return this.clips.length > 1
        }
    },
    methods: {
        infiniteHandler($state) {
            this.$axios.get('/twitch/clips', {
            params: {
                broadcasterId: this.id,
                first: 100,
                startedAt: this.startedAt,
                endedAt: this.endedAt,
                after: this.cursor
            }
            }).then(res => {
                this.loadedClip = true
                if (res.data.dto.clips.length > 1) {
                    res.data.dto.clips.forEach(clip => {
                        this.clips.push(clip)
                    })
                    this.cursor = res.data.dto.cursor
                    $state.loaded()
                } else {
                    $state.complete()
                }
            })
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
        openModal(clip) {
            this.clip = clip
            this.modal = true
        }
    }
}
</script>
<style scoped>
.clips-container {
    margin-top: 70px;
}
.clip-img {
    margin-bottom: 5px;
    cursor: pointer;
}
.clip-container {
    position: relative;
}
</style>
