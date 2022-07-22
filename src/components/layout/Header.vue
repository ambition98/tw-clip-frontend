<template>
    <div>
        <v-app>
            <v-app-bar
                app
                color="deep-purple darken-1"
                dark
            >
            <router-link to="/" class="router-link">
                <div class="d-flex align-center">
                <v-img
                    id="isedol-logo"
                    contain
                    src="@/assets/isedol_logo.png"
                    transition="scale-transition"
                    width="50"
                />
                <span id="title">이세돌 핫클립</span>
                </div>
            </router-link>

            <v-spacer></v-spacer>

            <a href="https://id.twitch.tv/oauth2/authorize?client_id=riz806ynb687m6a7piyz3jyl4q4p3a&redirect_uri=http://localhost:8080/afterlogin&scope=user:read:email&response_type=code">
                <v-btn id="test" color="purple" elevation="2">로그인</v-btn>
            </a>
            </v-app-bar>
        </v-app>
    </div>
</template>
<script>
export default {
    name: 'Header',
    components: {},
    data() {
        return {
            sampleData: ''
        }
    },
    setup() {},
    created() {},
    mounted() {},
    unmounted() {},
    methods: {}
}
</script>
<style scoped>
#isedol-logo {
  margin-right: 10px;
}
#title {
  font-size: 1.5rem;
  color: white;
}
</style>
