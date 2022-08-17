<template>
    <div>
        <v-container>
            <BroadcasterSearch />
            <!-- <v-btn @click="test">테스트용 버튼</v-btn> -->
            <div class="title">
                <div class="title-icon"><v-icon color="purple">mdi-star</v-icon></div>
                <div>즐겨찾기한 클립</div>
            </div>

            <v-divider></v-divider>

            <v-item-group class="clips-container">
                <v-container>
                    <v-row v-if="loading" justify="center">
                        <ProgressCircular />
                    </v-row>
                    <v-row v-else-if="clipIsExited">
                        <v-col v-for="clip in clips" :key="clip.id" align-self="start" md="3" class="clip-container">
                            <Clip :clip="clip" />
                        </v-col>
                        <InfiniteLoading @infinite="infiniteHandler">
                            <div slot="no-more"></div>
                            <div slot="no-results"></div>
                        </InfiniteLoading>
                    </v-row>
                    <v-row v-else>
                        즐겨찾기한 클립이 없습니다.
                    </v-row>
                </v-container>
            </v-item-group>
            <ClipModal v-if="modal" :modal="modal" :clip="clip" @close="modal=false"/>
        </v-container>
    </div>
</template>
<script>
import BroadcasterSearch from '@/components/BroadcasterSearch.vue'
import ClipModal from '@/components/ClipModal.vue'
import ProgressCircular from '@/components/ProgressCircular.vue'
import Clip from '@/components/Clip.vue'
import InfiniteLoading from 'vue-infinite-loading'

export default {
    components: {
        BroadcasterSearch,
        ClipModal,
        ProgressCircular,
        Clip,
        InfiniteLoading
    },
    computed: {
        clipIsExited: function() {
            return this.clips.length > 0
        }
    },
    data() {
        return {
            message: '',
            modal: false,
            snackbar: false,
            snackbarText: '',
            clips: [],
            loading: true,
            clip: '',
            page: 0
        }
    },
    created() {
        this.infiniteHandler()
    },
    methods: {
        infiniteHandler($state) {
            this.$axios.get('/user/favorites', {
                params: { page: this.page }
            }).then(res => {
                this.loading = false
                if (res.data.dto) {
                    this.page++
                    console.log(res.data.dto)
                    res.data.dto.forEach(clip => {
                        this.clips.push(clip)
                    })
                    $state.loaded()
                } else {
                    $state.complete()
                }
            }).catch(err => {
                console.log('/user/favorites err', err)
                this.loading = false
                const status = err.response.status
                if (status === 401) {
                    this.refreshToken()
                }
            })
        },
        // getFavorites(first) {
        //     this.$axios.get('/user/favorites', {
        //         params: { page: 0 }
        //     })
        //     .then(res => {
        //         this.clips = res.data.dto
        //         this.loadedClip = true
        //     }).catch(err => {
        //         if (first && err.response.status === 401) {
        //             this.refreshToken(this.getFavorites)
        //         } else {
        //             //
        //         }
        //     })
        // },
        async refreshToken() {
            try {
                const res = await this.$axios.get('/refresh')
            console.log(res.data)
            //   method(false)
                this.infiniteHandler()
            } catch (err) {
                alert('다시 로그인 해 주세요')
            }
                console.log('refershed')
      },
      setUser(user) {
        this.$store.dispatch('setUser', user)
      }
    }
}
</script>
<style scoped>
.clips-container {
    margin-top: 30px;
}
.clip-img {
    margin-bottom: 5px;
    cursor: pointer;
}
.clip-container {
    position: relative;
}
.title {
    font-weight: bold;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
}
.title-icon {
    display: flex;
    align-items: center;
    margin-right: 5px;
}
</style>
