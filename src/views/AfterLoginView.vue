<template>
  <div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
    }
  },
  setup() {},
  created() {
    const code = this.$route.query.code

    this.$axios.get('/twitch/oauth', {
      params: {
        code: code
      }
    }).then(res => {
      console.log(res.data)
      const token = res.data.dto.accessToken
      const user = res.data.dto.twitchUser
      this.$store.dispatch('setUser', user)

      this.$cookies.set('tk', token)
      this.$router.push('/')
    }).catch(error => {
      console.log('err: ' + error)
    })
  },
  mounted() {},
  unmounted() {},
  methods: {}
}
</script>
