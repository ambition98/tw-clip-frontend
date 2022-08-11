const method = {
    async refresh(tk, afterMethod) {
        const res = await this.$axios.get('/refresh', {
            headers: { Authorization: 'Bearer ' + tk }
        })
        if (res.status === 200) {
            this.user = res.data.dto.twitchUser
            this.$cookies.set('tk', res.data.dto.accessToken)
            if (afterMethod) {
                afterMethod(false)
            }
        } else {
            this.$cookies.set('tk', '')
            alert('다시 로그인해 주세요')
        }
    }
}
export default {
    install(Vue) {
        Vue.config.properties.$refresh = method.refresh
    }
}
