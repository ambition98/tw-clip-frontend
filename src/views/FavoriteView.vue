<template>
    <div>
        <v-container>
            <BroadcasterSearch />
            <v-btn @click="test">테스트용 버튼</v-btn>
            <div class="title-wrapper">
                <div class="title">
                    <div class="title-icon"><v-icon color="purple">mdi-star</v-icon></div>
                    <div>즐겨찾기한 클립</div>
                </div>
            </div>

            <div class="search-wrapper">
                <div class="search">
                    <v-text-field label="검색" v-model="searchValue" color="purple"></v-text-field>
                </div>

                <v-spacer></v-spacer>

                <div class="select_wrapper">
                    <v-select
                        label="정렬기준"
                        dense
                        color="purple"
                        v-model="selectedSort"
                        :items="sort"
                    ></v-select>
                </div>
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
        clipIsExited: function() {
            return this.clips.length > 0
        }
    },
    watch: {
        selectedSort: function() {
            this.sortClips()
        },
        searchValue: function() {
            this.loading = true
            if (!this.searchValue) {
                this.clips = this.allClips
            } else {
                this.clips = this.allClips.filter(e => {
                    return e.title.includes(this.searchValue) || e.broadcasterName.includes(this.searchValue)
                })
            }
            this.loading = false
        }
    },
    data() {
        return {
            message: '',
            modal: false,
            snackbar: false,
            snackbarText: '',
            clips: [],
            allClips: [],
            loading: true,
            clip: '',
            searchValue: '',
            selectedSort: '클립생성날짜▼',
            sort: [
                '클립생성날짜▲',
                '클립생성날짜▼',
                '조회수▲',
                '조회수▼',
                '추가날짜▲',
                '추가날짜▼',
                '이름▲',
                '이름▼'
            ],
            idList: [
                'PiliableChillyWormGrammarKing-rrDoT20hE9pv2Qyd',
                'BoredBoxyBasenjiKreygasm-oNa7VKx9llAi8Mvrx',
                'AssiduousDeadBadgerKeepo-21SXAdTQ42mcEncw',
                'BeautifulBraveBadgerVoteYea--QD8f7Y8Do1CrxfQ',
                'ClumsySparklyTubersTF2John-PWiUlpb1fcXYsrBe',
                'GenerousDaintyGnatDAESuppy-X48-v28YRK9O7b78',
                'TrappedAffluentHamKappaPride-6uEay8TSXQWmfwWL',
                'SweetViscousWrenCorgiDerp-rghen2JqFx-5AaKr',
                'GloriousPoorDragonStinkyCheese-edLxF4Ty8zlYVVA-',
                'GiftedModernKuduKappaPride-RP_6JbrW0CCDNP2S',
                'AbrasiveComfortableGaurGivePLZ-R3pIfqk_zDZCTCqj',
                'CoweringDarlingAppleCoolStoryBro-_v7DKb2NGFP_6Kef',
                'DelightfulImpartialPotSmoocherZ-bhdyA7IDP8i1VTFw',
                'invalidClip'
            ]
        }
    },
    created() {
        if (this.$store.getters.getUser) {
            this.$callUserApi(this.getFavorites)
        } else {
            alert('로그인 해 주세요')
            this.$router.push('/')
        }
    },
    methods: {
        getFavorites() {
            this.$axios.get('/user/favorites')
            .then(res => {
                this.loading = false
                if (res.data.dto) {
                    console.log(res.data.dto)
                    if (res.data.dto) {
                        res.data.dto.forEach(clip => {
                            this.allClips.push(clip)
                        })
                        this.clips = this.allClips
                    }
                }
            }).catch(err => {
                console.log('GET /user/favorites err', err.response.data)
                this.loading = false
            })
        },
        test() {
            this.idList.forEach(e => {
                this.postFavorite(e)
            })
        },
        postFavorite(id) {
            const data = { clipId: id }
            this.$axios.post('/user/favorite', data)
            .then(res => {
                console.log('POST /user/favorite', res.data.dto)
            }).catch(err => {
                console.log('POST /user/favorite err:', err.response)
            })
        },
        sortClips() {
            if (this.selectedSort === '조회수▲') {
                this.clips.sort((a, b) => {
                    return a.viewCount - b.viewCount
                })
            } else if (this.selectedSort === '조회수▼') {
                this.clips.sort((a, b) => {
                    return b.viewCount - a.viewCount
                })
            } else if (this.selectedSort === '추가날짜▲') {
                this.clips.sort((a, b) => {
                    return new Date(a.regdate) - new Date(b.regdate)
                })
            } else if (this.selectedSort === '추가날짜▼') {
                this.clips.sort((a, b) => {
                    return new Date(b.regdate) - new Date(a.regdate)
                })
            } else if (this.selectedSort === '클립생성날짜▲') {
                this.clips.sort((a, b) => {
                    return new Date(a.createdAt) - new Date(b.createdAt)
                })
            } else if (this.selectedSort === '클립생성날짜▼') {
                this.clips.sort((a, b) => {
                    return new Date(b.createdAt) - new Date(a.createdAt)
                })
            } else if (this.selectedSort === '이름▲') {
                this.clips.sort((a, b) => {
                    return a.title < b.title ? -1 : 1
                })
            } else if (this.selectedSort === '이름▼') {
                this.clips.sort((a, b) => {
                    return b.title < a.title ? -1 : 1
                })
            }
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
.title-wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
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
.search-wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}
.select_wrapper {
    max-width: 200px;
}
.search {
    position: relative;
    bottom: 7px;
}
</style>
