<template>
    <div>
        <v-hover v-slot="{ hover }">
            <v-card :elevation="hover ? 16 : 2">
                <div class="duration clip-info rounded-lg">{{ getDuration(clip) }}</div>
                <v-img eager :src="clip.thumbnailUrl" @click="openModal(clip)" class="clip-img" />
                <div class="view-count clip-info rounded-lg">{{ getViewCount(clip) }}</div>
                <div class="created-at clip-info rounded-lg">{{ getCreatedAt(clip) }}</div>
            </v-card>
        </v-hover>
        <div class="b-name" @click="goToBroadcasterPage(clip.broadcasterId)">{{ clip.broadcasterName }}</div>
        <div class="clip-title">{{ getTitle(clip) }}</div>
        <ClipModal v-if="modal" :modal="modal" :clip="clip" @close="closeModal" key="0"/>
    </div>
</template>
<script>
import ClipModal from '@/components/ClipModal.vue'

export default {
    name: 'Clip',
    components: {
        ClipModal
    },
    props: ['clip'],
    data() {
        return {
            modal: false
        }
    },
    methods: {
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
        openModal() {
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
    display: inline-block;
    overflow: hidden;
}
.clip-title {
    display: inline-block;
    overflow: hidden;
}
</style>
