<template>
    <div>
        <v-container>
            <BroadcasterSearch />
            <div class="title-wrapper">
                <div class="title">
                    <div class="title-icon"><v-icon color="purple">mdi-view-dashboard</v-icon></div>
                    <div>내 카테고리</div>
                </div>
                <v-spacer></v-spacer>
                <div class="select_wrapper">
                    <v-btn class="plus-icon" icon @click="createCategoryModal = true">
                        <v-icon color="gray">mdi-plus</v-icon>
                    </v-btn>
                    <v-btn class="plus-icon" icon @click="clickDeleteCategory()">
                        <v-icon color="gray">mdi-minus</v-icon>
                    </v-btn>
                    <v-select
                        label="카테고리"
                        dense
                        return-object
                        color="purple"
                        item-color="purple"
                        v-model="selectedCategory"
                        :items="categorys"
                        item-text="categoryName"
                        no-data-text="카테고리를 추가해주세요"
                    ></v-select>
                        <!-- :item-text="item => item.categoryName" -->
                </div>
            </div>

            <div class="search-wrapper">
                <div class="search">
                    <v-text-field label="검색" v-model="searchValue" color="purple"></v-text-field>
                </div>

                <v-spacer></v-spacer>

                <div class="sort_wrapper">
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
                    <v-row v-else-if="existsClip">
                        <v-col v-for="clip in clips" :key="clip.id" align-self="start" md="3" class="clip-container">
                            <Clip :clip="clip" />
                        </v-col>
                    </v-row>
                    <v-row v-else>
                        추가한 클립이 없습니다.
                    </v-row>
                </v-container>
            </v-item-group>
            <ClipModal v-if="modal" :modal="modal" :clip="clip" @close="modal=false"/>
            <CreateCategoryModal v-if="createCategoryModal" :modal="createCategoryModal" @close="createCategoryModal=false" @submit="addedCategory"/>
            <DeleteCategoryModal
                v-if="deleteCategoryModal"
                :modal="deleteCategoryModal"
                :category="selectedCategory"
                @close="deleteCategoryModal=false"
                @submit="deletedCategory"
            />
            <Snackbar v-if="snackbar" :snackbar="snackbar" :text="snackbarText" @close="snackbar=false"/>
        </v-container>
    </div>
</template>
<script>
import Snackbar from '@/components/Snackbar.vue'
import BroadcasterSearch from '@/components/BroadcasterSearch.vue'
import ClipModal from '@/components/ClipModal.vue'
import ProgressCircular from '@/components/ProgressCircular.vue'
import Clip from '@/components/Clip.vue'
import CreateCategoryModal from '@/components/CreateCategoryModal.vue'
import DeleteCategoryModal from '@/components/DeleteCategoryModal.vue'

export default {
    components: {
        Snackbar,
        BroadcasterSearch,
        ClipModal,
        ProgressCircular,
        Clip,
        CreateCategoryModal,
        DeleteCategoryModal
    },
    computed: {
        existedCategory: function() {
            try {
                return this.categorys.length > 0
            } catch (err) {
                return false
            }
        },
        existsClip: function() {
            if (this.clips.length > 0 && !this.loading) {
                return true
            } else {
                return false
            }
        }
    },
    watch: {
        categorys: function() {
            if (this.categorys.length < 1) {
                this.selectedCategory = '카테고리 없음'
            }
        },
        selectedCategory: function() {
            this.$callUserApi(this.getCategoryClips)
        },
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
            clip: '',
            selectedCategory: '카테고리 없음',
            categorys: [],
            createCategoryModal: false,
            deleteCategoryModal: false,
            loading: true,
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
            ]
        }
    },
    created() {
        if (this.$store.getters.getUser) {
            this.$callUserApi(this.getCategorys)
        } else {
            alert('로그인 해 주세요')
            this.$router.push('/')
        }
    },
    methods: {
        getCategorys() {
            const url = '/user/categorys'
            this.$axios.get(url)
            .then(res => {
                console.log('GET ' + url + ':', res.data.dto)
                if (res.data.dto) {
                    res.data.dto.forEach(e => {
                        this.categorys.push(e)
                    })
                    this.selectedCategory = this.categorys[0]
                }
            }).catch(err => {
                console.log('GET ' + url + ':', err.response)
            })
        },
        getCategoryClips() {
            this.clips = ''
            console.log('getCategoryClips()')
            const url = '/user/category/' + this.selectedCategory.id + '/clips'
            this.$axios.get(url)
            .then(res => {
                console.log('GET ' + url + ':', res.data.dto)
                if (res.data.dto) {
                    res.data.dto.forEach(clip => {
                        this.allClips.push(clip)
                        // this.clips.push(clip)
                    })
                    this.clips = this.allClips
                }
            }).catch(err => {
                console.log('GET ' + url + ':', err.response)
            })
            this.loading = false
        },
        clickDeleteCategory() {
            if (this.selectedCategory !== '카테고리 없음') {
                this.deleteCategoryModal = true
            }
        },
        addedCategory(category) {
            console.log('addedCategory: ', category)

            this.categorys.push(category)
            this.snackbarText = '추가되었습니다'
            this.snackbar = true
            if (this.categorys.length === 1) {
                this.selectedCategory = this.categorys[0]
            }
        },
        deletedCategory(category) {
            this.categorys.forEach((e, idx) => {
                if (e.id === category.id) {
                    this.categorys.splice(idx, 1)
                }
            })
            this.selectedCategory = this.categorys.length > 0 ? this.categorys[0] : ''
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
.category-btn {
    margin-left: 10px;
}
.select_wrapper {
    display: flex;
    align-items: center;
    max-width: 300px;
    margin-top: 10px;
}
.sort_wrapper {
    max-width: 200px;
}
.plus-icon {
    bottom: 5px;
}
.search {
    position: relative;
    bottom: 7px;
}
</style>
