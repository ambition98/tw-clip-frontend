<template>
  <!-- <div>
      <Header />
      <v-main>
      <router-view/>
      </v-main>
      <Footer />
  </div> -->
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
    <v-main>
      <button @click="getUser">유저</button>
      <router-view/>
    </v-main>
    <v-app-bar
      color="grey darken-2"
      elevation="4"
    >
    <div class="d-flex align-center footer" id="footer">
      <v-icon
        color="white"
      >
        mdi-email
      </v-icon>
      ambition65@naver.com
    </div>

    <v-spacer></v-spacer>

    <span class="github" @click="goToGithubFront">
      <v-img
          class="github-logo"
          contain
          src="@/assets/github_logo.png"
          transition="scale-transition"
          max-width="30"
      /> <span class="github-span">Frontend</span>
    </span>
    <span class="github" @click="goToGithubBack">
      <v-img
          class="github-logo"
          contain
          src="@/assets/github_logo.png"
          transition="scale-transition"
          max-width="30"
      /> <span class="github-span">Backend</span>
    </span>
    </v-app-bar>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  component: {
    id: '',
    name: '',
    profileImg: ''
  },
  data: () => ({
  }),
  mounted() {
  },
  methods: {
    goToGithubFront() {
      window.open('https://github.com/ambition98/isedol-clip-frontend')
    },
    goToGithubBack() {
      window.open('https://github.com/ambition98/isedol-clip-backend')
    },
    getUser() {
      const tk = this.$cookies.get('tk')
      console.log('tk: ' + tk)
      this.$axios.get('/api/twitch/user', {
        headers: {
          Authorization: 'Bearer ' + tk
        }
      }).then(res => {
        console.log(res.data)
      })
    }
  }
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
#footer {
  font-size: 1.2rem;
  color: white;
}
#footer > i {
  margin-right: 10px;
}
.github {
  margin-left: 20px;
  cursor: pointer;
}
.github-logo {
  margin-left: 20px;
}
.github-span {
  font-size: 1.1rem;
  color: white;
}
.test {
  box-shadow: 5px 5px 5px 5px white;
}
</style>
<style>
a {
  text-decoration: none;
}
</style>
