<template>
    <div>
        <v-dialog v-model="open" max-width="500px">
            <v-card>
                <div class="input-wrapper">
                    <v-text-field
                        v-model="value"
                        label="카테고리 이름"
                        :rules="rules"
                        hide-details="auto"
                        ref="input"
                        autofocus
                    ></v-text-field>
                </div>
                <div class="btn-wrapper">
                    <v-spacer></v-spacer>
                    <v-btn color="primary" class="submit" @click="submit">확인</v-btn>
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
                value => (value && value.length <= 20) || '20자를 넘을 수 없습니다.'
            ],
            open: '',
            snackbar: false,
            snackbarText: '',
            addedCategory: ''
        }
    },
    watch: {
      open: function() {
        if (!this.open) {
          this.$emit('close')
        }
      }
    },
    setup() {},
    created() {
        this.open = this.modal
    },
    mounted() {},
    unmounted() {},
    methods: {
        submit() {
            let valid = true
            this.rules.forEach(e => {
                if (!(e(this.value) === true)) {
                    valid = false
                }
            })

            if (valid) {
                this.postCategory(true)
            } else {
                this.snackbarText = '1~20 글자 사이로 입력해주세요'
                this.snackbar = true
            }
        },
        async postCategory(first) {
            const data = { categoryName: this.value }
            try {
                const res = await this.$axios.post('/user/category', data)
                console.log('/user/category dto', res.data.dto)
                this.$emit('submit', res.data.dto)
                this.open = false
            } catch (err) {
                const status = err.response.status
                if (status === 400) {
                    const msg = err.response.data.msg
                    this.snackbarText = msg
                    this.snackbar = true
                } else if (first && status === 401) {
                    this.refreshToken(this.postCategory)
                }
                console.log('/user/category err', err.response.data)
            }
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
}
.cancel {
    margin-right: 10px;
}
</style>
