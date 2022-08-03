<template>
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

      <div v-if="user" class="user">
        <v-img
          max-width="40"
          :src="user.profileImageUrl"
          class="profile-img"
          @click="goToProfile"
        />
        <span class="user-name">{{ user.displayName }}</span>
      </div>
      <div v-else>
        <a href="https://id.twitch.tv/oauth2/authorize?client_id=riz806ynb687m6a7piyz3jyl4q4p3a&redirect_uri=http://localhost:8080/afterlogin&response_type=code">
        <!-- <a href="https://id.twitch.tv/oauth2/authorize?client_id=riz806ynb687m6a7piyz3jyl4q4p3a&redirect_uri=https://isedol-clip.xyz/afterlogin&scope=user:read:email&response_type=code"> -->
          <v-btn id="test" color="purple" elevation="2">로그인</v-btn>
        </a>
      </div>
    </v-app-bar>
    <v-main>
      <router-view :key="$route.fullPath"/>
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
          src="@/assets/github_logo.png"
          max-width="30"
      /> <span class="github-span">Frontend</span>
    </span>
    <span class="github" @click="goToGithubBack">
      <v-img
          class="github-logo"
          src="@/assets/github_logo.png"
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
  },
  data: () => ({
    user: '',
    userLoaded: false
  }),
  created() {
    console.log('App.vue created()')
    this.requestAndStoreIsedol()
    const tk = this.$cookies.get('tk')
    if (tk) {
      const user = this.requestUser(tk)
      this.user = user
    }
  },
  computed: {
    storeUser: function() {
      return this.$store.getters.getUser
    }
  },
  watch: {
    storeUser(value) {
      this.user = value
    }
  },
  methods: {
    goToGithubFront() {
      window.open('https://github.com/ambition98/isedol-clip-frontend')
    },
    goToGithubBack() {
      window.open('https://github.com/ambition98/isedol-clip-backend')
    },
    goToProfile() {
      console.log('click')
    },
    requestAndStoreIsedol() {
      this.$axios.get('/storage/isedol')
      .then(res => {
        this.$store.dispatch('setIsedolInfo', res.data.dto)
      })
    },
    requestUser(tk) {
      this.$axios.get('/user', {
        headers: {
          Authorization: 'Bearer ' + tk
        }
      }).then(res => {
        this.user = res.data.dto
      }).catch(err => {
        if (err.response.status === 401) {
          this.refreshToken(tk)
        }
      })
    },
    refreshToken(tk) {
      console.log('refresh')
      this.$axios.get('/refresh', {
        headers: {
          Authorization: 'Bearer ' + tk
        }
      }).then(res => {
        console.log(res.data)
        this.user = res.data.dto.twitchUser
        this.$cookies.set('tk', res.data.dto.accessToken)
      })
    },
    getUser() {
      return this.$store.getters.getUser
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
  margin-left: 15px;
}
.github-span {
  color: white;
}
.user {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.user-name {
  margin-left: 10px;
}
.profile-img {
  border-radius: 100%;
}
</style>
<style>
a {
  text-decoration: none;
}
</style>
