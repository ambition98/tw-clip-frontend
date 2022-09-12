<template>
    <div>
        <v-dialog v-model="open" max-width="500px">
            <v-card>
                <div class="input-wrapper">
                    <div class="title">카테고리 추가</div>
                    <v-text-field
                        color="purple"
                        v-model="value"
                        label="카테고리 이름"
                        :rules="rules"
                        hide-details="auto"
                        ref="input"
                        autofocus
                        :error="err"
                        :error-messages="errMsg"
                    ></v-text-field>
                </div>
                <div class="btn-wrapper">
                    <v-spacer></v-spacer>
                    <v-btn color="purple" class="submit" @click="submit">확인</v-btn>
                    <v-btn color="red" class="cancel" @click="open = false">취소</v-btn>
                </div>
            </v-card>
        </v-dialog>
        <Snackbar v-if="snackbar" :snackbar="snackbar" :text="snackbarText" @close="snackbar=false"/>
    </div>
</template>
<script>
import Snackbar from '@/components/Snackbar.vue'

export default {
    name: 'CreateCategoryModal',
    components: {
        Snackbar
    },
    props: ['modal'],
    data() {
        return {
            value: '',
            rules: [
                value => !!value || '필수항목입니다.',
                value => (value && value.length <= 20) || '1~20 글자 사이로 입력해주세요'
            ],
            open: '',
            snackbar: false,
            snackbarText: '',
            addedCategory: '',
            err: false,
            errMsg: ''
        }
    },
    watch: {
      open: function() {
        if (!this.open) {
          this.$emit('close')
        }
      },
      value: function() {
        this.err = false
        this.errMsg = ''
      }
    },
    created() {
        this.open = this.modal
    },
    methods: {
        submit() {
            this.$callUserApi(this.postCategory)
        },
        async postCategory() {
            const url = '/user/category'
            const data = { categoryName: this.value }
            try {
                const res = await this.$axios.post(url, data)
                console.log('POST ' + url + ':', res.data.dto)
                const category = {
                    id: res.data.dto.id,
                    categoryName: res.data.dto.categoryName
                }
                this.errMsg = ''
                this.err = false
                this.$emit('submit', category)
                this.open = false
            } catch (err) {
                console.log('POST' + url + ':', err.response.data)
                this.errMsg = err.response.data.msg
                this.err = true
            }
        }
    }
}
</script>
<style scoped>
.input-wrapper {
    padding: 10px;
}
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
.title {
    margin-bottom: 20px;
    color: purple;
    font-weight: bold;
}
</style>
