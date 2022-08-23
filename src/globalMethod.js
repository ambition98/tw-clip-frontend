export default {
    install(Vue) {
        Vue.prototype.$callUserApi = global.callUserApi
    }
}

export const global = {
    async callUserApi(method) {
        try {
            const res = await this.$axios.get('/user/verify')
            console.log('verify: ', res)
            console.log('Execute method()')
            method()
        } catch (err) {
            const status = err.response.status
            console.log('/user/verify status:', status)
            if (status === 401) {
                console.log('Try refresh token')
                const res = await this.$axios.get('/refresh')
                console.log('/refresh:', res.data)
                console.log('Refreshed. Try execute method()')
                method()
            } else {
                alert('로그아웃 되었습니다.')
            }
        }
    }
}
