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
      console.log('/oauth res.data', res.data.dto)
      const user = res.data.dto
      this.$store.dispatch('setUser', user)
      this.$router.push('/')
    }).catch(error => {
      console.log('err: ' + error)
    })
  },
  methods: {
  }
}
</script>
