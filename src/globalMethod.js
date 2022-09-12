export default {
    install(Vue) {
        Vue.prototype.$callUserApi = global.callUserApi
        Vue.prototype.$logout = global.logout
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
                try {
                    const refreshRes = await this.$axios.get('/refresh')
                    if (refreshRes.status !== 200) {
                        const res = await this.$axios.post('/logout')
                        console.log('POST /logout', res.data)
                        this.$store.dispatch('setUser', '')
                        alert('로그아웃 되었습니다.')
                    } else {
                        console.log('/refresh:', refreshRes)
                        console.log('Refreshed. Try execute method()')
                        method()
                    }
                } catch (refreshErr) {
                    console.log('refreshError:', refreshErr)
                }
            } else {
                const res = await this.$axios.post('/logout')
                console.log('POST /logout', res.data)
                this.$store.dispatch('setUser', '')
                alert('로그아웃 되었습니다.')
            }
        }
    },
    async logout() {
        const res = await this.$axios.post('/logout')
        console.log('POST /logout', res.data)
        this.$store.dispatch('setUser', '')
        alert('로그아웃 되었습니다.')
    }
}
