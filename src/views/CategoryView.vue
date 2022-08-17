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
                <div class="combo_wrapper">
                    <v-combobox
                        dense
                        return-object
                        color="purple"
                        v-model="select"
                        :items="categorys"
                        item-text="categoryName"
                    ></v-combobox>
                        <!-- :item-text="item => item.categoryName" -->
                    <v-btn class="plus-icon" icon @click="createCategoryModal = true">
                        <v-icon color="gray">mdi-plus</v-icon>
                    </v-btn>
                    <v-btn class="plus-icon" icon @click="deleteCategoryModal = true">
                        <v-icon color="gray">mdi-minus</v-icon>
                    </v-btn>
                </div>
            </div>
            <v-divider></v-divider>

            <v-item-group class="clips-container">

                <v-container>
                    <v-row v-if="!existedCategory">
                        카테고리를 추가해주세요
                    </v-row>
                    <v-row v-else-if="loading" justify="center">
                            <ProgressCircular />
                    </v-row>
                    <v-row v-else-if="existedClip">
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
                :category="select"
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
        existedClip: function() {
            if (this.clips.length > 0 && !this.loading) {
                return true
            } else {
                return false
            }
        }
    },
    watch: {
        select: function() {
            this.getCategoryClips(true)
        }
    },
    data() {
        return {
            message: '',
            modal: false,
            snackbar: false,
            snackbarText: '',
            clips: [],
            clip: '',
            select: '카테고리 선택',
            categorys: [],
            createCategoryModal: false,
            deleteCategoryModal: false,
            loading: true
        }
    },
    created() {
        this.getCategorys(true)
    },
    methods: {
        getCategorys(first) {
            this.$axios.get('/user/categorys')
            .then(res => {
                console.log('/user/categorys res.data.dto: ', res.data.dto)
                this.categorys = res.data.dto
                this.select = this.categorys[0]
            }).catch(err => {
                if (first && err.response.status === 401) {
                    this.refreshToken(this.getCategorys)
                } else {
                    // alert('다시 로그인해 주세요')
                }
            })
        },
        getCategoryClips(first) {
            this.loading = false
        },
        async refreshToken(method) {
            try {
                const res = await this.$axios.get('/refresh')
                console.log(res.data)
                method(false)
            } catch (err) {
                alert('다시 로그인 해 주세요')
            }
        },
        setUser(user) {
            this.$store.dispatch('setUser', user)
        },
        addedCategory(category) {
            this.categorys.push(category)
            this.snackbarText = '추가되었습니다'
            this.snackbar = true
        },
        deletedCategory(category) {
            this.categorys.forEach((e, idx) => {
                if (e.id === category.id) {
                    this.categorys.splice(idx, 1)
                }
            })
            this.select = this.categorys.length > 0 ? this.categorys[0] : ''
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
.category-btn {
    margin-left: 10px;
}
.combo_wrapper {
    display: flex;
    align-items: center;
    max-width: 300px;
}
.plus-icon {
    bottom: 5px;
}
</style>
