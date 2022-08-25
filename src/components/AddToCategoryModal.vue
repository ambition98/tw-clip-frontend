<template>
    <div class="modal">
        <v-dialog v-model="open" max-width="400px">
            <v-card>
                <div v-if="!existsCategory">
                    생성된 카테고리가 없습니다.
                </div>
                <v-virtual-scroll
                    v-else
                    height="300"
                    :items="categorys"
                    item-height="64"
                >
                    <template v-slot:default="{ item }">
                        {{ item.categoryName }}
                        <!-- <v-list-item :key="item.id" @mouseover="hover(item.id)" @mouseleave="leave(item.id)" @click="click(item.id)" :id="item.id" class="category-list">
                            <v-list-item-content>
                                {{ item.categoryName }}
                            </v-list-item-content>
                        </v-list-item> -->
                        <v-divider></v-divider>
                    </template>
                </v-virtual-scroll>
                <div @click="createCategoryModal=true" class="add-category">
                    <v-icon color="gray" small>mdi-plus</v-icon>
                    <div>카테고리 추가</div>
                </div>
                <div class="btn-wrapper">
                    <v-spacer></v-spacer>
                    <v-btn color="purple darken-1" class="submit" @click="submit">추가</v-btn>
                    <v-btn color="red" class="cancel" @click="open = false">취소</v-btn>
                </div>
            </v-card>
        </v-dialog>
        <Snackbar v-if="snackbar" :snackbar="snackbar" :text="snackbarText" @close="snackbar=false"/>
        <CreateCategoryModal v-if="createCategoryModal" :modal="createCategoryModal" @close="createCategoryModal=false" @submit="addedCategory"/>
    </div>
</template>
<script>
import Snackbar from '@/components/Snackbar.vue'
import CreateCategoryModal from '@/components/CreateCategoryModal.vue'

export default {
    name: 'AddToCategoryModal',
    components: {
        Snackbar,
        CreateCategoryModal
    },
    props: ['modal', 'clipId'],
    data() {
        return {
            open: '',
            snackbar: false,
            snackbarText: '',
            categorys: [],
            selectedId: '',
            createCategoryModal: false,
            loadedCategory: false
        }
    },
    computed: {
        existsCategory: function() {
            return this.loadedCategory && this.categorys.length > 0
        }
    },
    watch: {
      open: function() {
        if (!this.open) {
          this.$emit('close')
        }
      }
    },
    created() {
        this.open = this.modal
        this.$callUserApi(this.getCategorys)
    },
    methods: {
        submit() {
            if (this.selectedId) {
                this.$callUserApi(this.postCategoryClip)
            } else {
                this.snackbarText = '카테고리를 선택해주세요'
                this.snackbar = true
            }
        },
        getCategorys() {
            this.$axios.get('/user/categorys')
            .then(res => {
                console.log('GET /user/categorys res.data.dto: ', res.data.dto)
                if (res.data.dto) {
                    this.categorys = res.data.dto
                }
                this.loadedCategory = true
            }).catch(err => {
                console.log('GET /user/categorys err:', err.response)
            })
        },
        postCategoryClip() {
            const url = '/user/category/' + this.selectedId + '/clip/' + this.clipId
            this.$axios.post(url)
            .then(res => {
                console.log('POST ' + url + ':', res.data)
                this.$emit('submit')
                this.open = false
            }).catch(err => {
                console.log('POST' + url + ':', err.response)
            })
        },
        addedCategory(data) {
            const category = {
                id: data.id,
                categoryName: data.categoryName
            }
            this.categorys.push(category)
            this.snackbarText = '추가되었습니다'
            this.snackbar = true
        },
        selectCategory() {
            console.log('selectCategory(0)')
        },
        hover(id) {
            // this.removeClass('hover')
            document.getElementById(id).classList.add('hover')
        },
        leave(id) {
            document.getElementById(id).classList.remove('hover')
        },
        click(id) {
            this.removeClass('click')
            document.getElementById(id).classList.add('click')
            this.selectedId = id
        },
        removeClass(c) {
            const list = document.getElementsByClassName('category-list')
            for (var i = 0; i < list.length; i++) {
                list[i].classList.remove(c)
            }
        }
    }
}
</script>
<style scoped>
.btn-wrapper {
    display: flex;
    align-items: center;
}
.submit {
    margin: 10px;
    color: white;
}
.cancel {
    margin-right: 10px;
}
.hover {
    background: #E1BEE7;
}
.click {
    background: #CE93D8;
}
.add-category {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 10px;
    color: gray;
    font-size: 0.9rem;
    cursor: pointer;
}
/* .category {
    padding: 10px;
} */
</style>
