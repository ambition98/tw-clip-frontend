<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
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

      <v-spacer></v-spacer>

      <v-btn
        color="purple"
        elevation="2"
      >로그인</v-btn>

    </v-app-bar>
    <v-main>
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

    <!-- <a href="https://github.com/ambition98/isedol-clip-frontend"> -->
    <span class="github" @click="goToGithubFront">
      <v-img
          class="github-logo"
          contain
          src="@/assets/github_logo.png"
          transition="scale-transition"
          max-width="30"
      /> <span class="github-span">Frontend</span>
    </span>
    <!-- </a> -->
    <!-- <a href="https://github.com/ambition98/isedol-clip-backend"> -->
    <span class="github" @click="goToGithubBack">
      <v-img
          class="github-logo"
          contain
          src="@/assets/github_logo.png"
          transition="scale-transition"
          max-width="30"
      /> <span class="github-span">Backend</span>
    </span>
    <!-- </a> -->
    </v-app-bar>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  component: {
  },
  data: () => ({
    //
  }),
  methods: {
    goToGithubFront() {
      window.open('https://github.com/ambition98/isedol-clip-frontend')
    },
    goToGithubBack() {
      window.open('https://github.com/ambition98/isedol-clip-backend')
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
</style>
