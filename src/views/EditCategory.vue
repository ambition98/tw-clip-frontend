<template>
    <div>
        <v-container>
            <div class="title-wrapper">
                <div class="title">
                    <div class="title-icon"><v-icon color="purple">mdi-view-dashboard</v-icon></div>
                    <div>카테고리 편집</div>
                </div>
            </div>

            <v-divider></v-divider>

            <div class="search-wrapper">
                <div class="search">
                    <v-text-field label="클립제목, 스트리머 검색" v-model="searchValue" color="purple"></v-text-field>
                </div>

                <v-spacer></v-spacer>

                <div class="select_wrapper">
                    <v-select
                        style="top: 7px"
                        label="정렬기준"
                        dense
                        color="purple"
                        v-model="selectedSort"
                        :items="sort"
                    ></v-select>
                </div>
            </div>
            <div class="select_wrapper">
                <div>
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
                </div>
            </div>
            <div class="header">
                <div class="checkAll" @click="checkAll"><input style="margin-right: 5px" type="checkbox" id="checkAll" @click="checkAll()"><div>전체선택</div></div>
                <v-btn id="btn-delete" @click="openConfirm" color="red">선택삭제</v-btn>
            </div>

            <div v-if="loading" style="text-align: center"><ProgressCircular /></div>
            <div v-else-if="width < 550">
                <div v-if="clips.length == 0">
                    즐겨찾기한 클립이 없습니다.
                </div>
                <div v-else v-for="(clip, i) in clips" :key="clip.id" class="s-container">
                    <div class="s-check">
                        <input :id="i" type="checkbox" :value="clip.id" v-model="checkedArr">
                    </div>
                    <div class="s-info">
                        <div class="s-imgContainer">
                            <div class="s-img"><v-img eager :src="clip.thumbnailUrl" @click="openModal(clip)"/></div>
                            <div class="s-bName">{{ clip.broadcasterName }}</div>
                            <div class="s-viewCount">{{ clip.viewCount }}회</div>
                            <div class="s-createdAt">{{ clip.createdAt }}</div>
                        </div>
                        <div class="s-title">
                            {{ clip.title }}
                        </div>
                    </div>
                </div>
            </div>

            <div v-else>
                <div v-if="clips.length == 0">
                    즐겨찾기한 클립이 없습니다.
                </div>
                <table v-else>
                    <tbody>
                        <tr v-for="(clip, i) in clips" :key="clip.id" class="line">
                            <td style="width: 1px"><div class="clip-check"><input :id="i" type="checkbox" :value="clip.id" v-model="checkedArr"></div></td>
                            <td style="width: 1px"><div class="clip-img" @click="openModal(clip)"><v-img eager :src="clip.thumbnailUrl"/></div></td>
                            <td style="width: 83px"><div class="clip-broadcaster-name">{{ clip.broadcasterName }}</div></td>
                            <td><div class="clip-title">{{ clip.title }}</div></td>
                            <td style="width: 83px"><div class="clip-viewcount">{{ clip.viewCount }}회</div></td>
                            <td style="width: 93px"><div class="clip-createdat">{{ clip.createdAt }}</div></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <ClipModal v-if="modal" :modal="modal" :clip="clip" @close="modal=false" :key="key"/>
            <Snackbar v-if="snackbar" :snackbar="snackbar" :text="snackbarText" @close="snackbar=false"/>
            <ConfirmModal
                v-if="confirmModal"
                :modal="confirmModal"
                :title="confirmTitle"
                :content="confirmContent"
                :info="confirmInfo"
                @close="confirmModal=false"
                @submit="deleteFav"
            />
        </v-container>
    </div>
</template>
<script>
import Snackbar from '@/components/Snackbar.vue'
import ClipModal from '@/components/ClipModal.vue'
import ProgressCircular from '@/components/ProgressCircular.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'

export default {
    components: {
        ConfirmModal,
        Snackbar,
        ClipModal,
        ProgressCircular
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
            this.loading = true
            this.clips = []
            this.allClips = []
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
            key: 1,
            width: '',
            message: '',
            modal: false,
            snackbar: false,
            snackbarText: '',
            clips: [],
            allClips: [],
            selectedCategory: '',
            categorys: [],
            loading: true,
            clip: '',
            searchValue: '',
            selectedSort: '',
            sort: [
                '추가날짜▲',
                '추가날짜▼',
                '클립생성날짜▲',
                '클립생성날짜▼',
                '조회수▲',
                '조회수▼',
                '이름▲',
                '이름▼'
            ],
            checkedArr: [],
            confirmModal: '',
            confirmTitle: '',
            confirmContent: '',
            confirmInfo: ''
        }
    },
    created() {
        this.width = window.innerWidth
        if (this.$store.getters.getUser) {
            this.$callUserApi(this.getCategorys)
        } else {
            alert('로그인 해 주세요')
            this.$router.push('/')
        }
        this.loading = false
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
                    this.selectedSort = '추가날짜▼'
                }
            }).catch(err => {
                console.log('GET ' + url + ':', err.response)
            })
        },
        getCategoryClips() {
            this.clips = ''
            const url = '/user/category/' + this.selectedCategory.id + '/clips'
            this.$axios.get(url)
            .then(res => {
                console.log('GET ' + url + ':', res.data.dto)
                if (res.data.dto) {
                    res.data.dto.forEach(clip => {
                        if (this.width < 800) {
                            if (clip.title.length > 50) {
                                clip.title = clip.title.substring(0, 50) + ' ...'
                            }
                        }
                        this.allClips.push(clip)
                    })
                    this.clips = this.allClips
                }
                this.loading = false
            }).catch(err => {
                console.log('GET ' + url + ':', err.response)
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
        },
        checkAll() {
            const checkAll = document.getElementById('checkAll')
            const allBoxes = document.querySelectorAll('input[type="checkbox"]')
            if (checkAll.checked) {
                allBoxes.forEach((e) => {
                    e.checked = false
                })
                this.checkedArr = []
            } else {
                allBoxes.forEach((e) => {
                    e.checked = true
                })
                const arr = []
                this.clips.forEach(e => {
                    arr.push(e.id)
                })
                this.checkedArr = arr
            }
        },
        openConfirm() {
            const len = this.checkedArr.length
            if (len < 1) {
                this.snackbarText = '삭제할 클립을 선택해주세요'
                this.snackbar = true
                return
            }
            this.confirmTitle = '즐겨찾기 삭제'
            this.confirmContent = '개 클립을 삭제하시겠습니까? 삭제된 클립은 복구할 수 없습니다.'
            this.confirmInfo = len
            this.confirmModal = true
        },
        deleteFav() {
            this.$callUserApi(this.deleteFavorites)
        },
        deleteFavorites() {
            if (!this.checkedArr.length) {
                this.snackbarText = '선택된 클립이 없습니다'
                this.snackbar = true
                return
            }
            const url = '/user/favorite'
            this.$axios.delete(url, {
                data: { clipsId: this.checkedArr }
            })
            .then(res => {
                console.log('DELETE ', url, ' res: ', res)
                this.$router.go()
            }).catch(err => {
                console.log('DELETE ', url, ' err: ', err)
            })
        },
        openModal(clip) {
            this.clip = clip
            this.modal = true
        },
        closeModal() {
            this.modal = false
            this.key++
        }
    }
}
</script>
<style scoped>
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-top: 1px solid darkgray;
    border-bottom: 1px solid darkgray;
}
.search-wrapper {
    display: flex;
    align-items: center;
}
.select_wrapper {
    width: 160px;
}
.select_wrapper {
    display: flex;
    align-items: center;
    max-width: 300px;
    flex-direction: row-reverse;
}
.search {
    width: 200px;
}
.checkAll {
    display: flex;
    align-items: center;
}
#btn-delete {
    color: white;
}
.clip-img {
    width: 100px;
    cursor: pointer;
}
table{
    border-collapse: collapse;
    font-size: 0.9rem;
    width: 100%;
}
td {
    border-bottom: 1px solid  darkgray;
    padding : 5px;
}
.clips-container {
    font-size: 0.9rem;
}
.clip-title {
    text-align: left;
}
.s-container {
    display: flex;
    border-bottom: 1px solid darkgray;
}
.s-container > * {
    padding: 5px;
}
.s-check {
    display: flex;
    align-items: center;
}
.s-imgContainer {
    display: flex;
    align-items: center;
    cursor: pointer;
}
.s-imgContainer > * {
    padding: 5px;
}
.s-img {
    height: 100%;
    width: 100px;
}
.title-wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 10px;
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
input[type="checkbox"]{
    width: 20px;
    height: 20px;
    cursor: pointer;
}
</style>
