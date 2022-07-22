<template>
  <div>
    after login
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

    this.$axios.get('/api/twitch/oauth', {
      params: {
        code: code
      }
    }).then(res => {
      const token = res.data.dto.accessToken
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
