<template>
    <div>
        <v-dialog v-model="open" max-width="500px">
            <v-card>
                <div class="description">
                    <div class="title">{{ title }}</div>
                    <div class="additional-info">
                        {{ info }}
                    </div>
                    <div class="others">
                        {{ content }}
                    </div>
                </div>
                <div class="btn-wrapper">
                    <v-spacer></v-spacer>
                    <v-btn color="purple" class="submit" @click="submit">확인</v-btn>
                    <v-btn color="red" class="cancel" @click="open = false">취소</v-btn>
                </div>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>

export default {
    name: 'ConfirmModal',
    props: ['modal', 'title', 'content', 'info'],
    data() {
        return {
            open: '',
            targetCategory: ''
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
    },
    methods: {
        submit() {
            this.$callUserApi(this.deleteCategory)
            this.$emit('submit')
            this.open = false
        }
        // deleteCategory() {
        //     this.$axios.delete('/user/category/' + this.category.id)
        //     .then(res => {
        //         console.log('DELETE /user/category dto: ', res.data)
        //         this.$emit('submit', this.targetCategory)
        //         this.open = false
        //     }).catch(err => {
        //         console.log('DELETE /user/category err:', err.response)
        //     })
        // }
    }
}
</script>
<style scoped>
.description {
    padding: 10px;
}
.additional-info {
    display: inline;
    font-weight: bold;
}
.others {
    display: inline;
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
