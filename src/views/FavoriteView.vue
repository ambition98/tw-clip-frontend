<template>
    <div>
        <v-container>
            <BroadcasterSearch />
            <div class="title">
                <div class="title-icon"><v-icon color="purple">mdi-star</v-icon></div>
                <div>즐겨찾기한 클립</div>
            </div>

            <v-divider></v-divider>

            <v-item-group class="clips-container">
                <v-container>
                    <v-row v-if="!loadedClip" justify="center">
                            <ProgressCircular />
                    </v-row>
                    <v-row v-else-if="existedClip">
                        <v-col v-for="clip in clips" :key="clip.id" align-self="start" md="3" class="clip-container">
                            <Clip :clip="clip" />
                        </v-col>
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

export default {
    components: {
        BroadcasterSearch,
        ClipModal,
        ProgressCircular,
        Clip
    },
    computed: {
        existedClip: function() {
            try {
                return this.clips.length > 0
            } catch (err) {
                return false
            }
        }
    },
    data() {
        return {
            message: '',
            modal: false,
            snackbar: false,
            snackbarText: '',
            clips: [],
            loadedClip: false,
            clip: ''
        }
    },
    setup() {},
    created() {
        this.getFavorites(true)
    },
    mounted() {},
    unmounted() {},
    methods: {
        getFavorites(first) {
            this.$axios.get('/user/favorites')
            .then(res => {
                this.clips = res.data.dto
                this.loadedClip = true
            }).catch(err => {
                if (first && err.response.status === 401) {
                    this.refreshToken(this.getFavorites)
                } else {
                    alert('다시 로그인해 주세요')
                }
            })
        },
        async refreshToken(method) {
        try {
          const res = await this.$axios.get('/refresh')
          console.log(res.data)
        //   this.setUser(res.data.dto)
          method(false)
        } catch (err) {
          alert('다시 로그인 해 주세요')
        }
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
