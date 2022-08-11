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
      <div v-if="userLoading"></div>
      <div v-else-if="storeUser" class="user" @click="drawer = !drawer">
        <v-img
          max-width="40"
          :src="storeUser.profileImageUrl"
          class="profile-img"
        />
        <span class="user-name">{{ storeUser.displayName }}</span>
      </div>
      <div v-else>
        <a href="https://id.twitch.tv/oauth2/authorize?client_id=riz806ynb687m6a7piyz3jyl4q4p3a&redirect_uri=http://localhost:8080/afterlogin&response_type=code">
        <!-- <a href="https://id.twitch.tv/oauth2/authorize?client_id=riz806ynb687m6a7piyz3jyl4q4p3a&redirect_uri=https://isedol-clip.xyz/afterlogin&response_type=code"> -->
          <v-btn id="test" color="purple" elevation="2">로그인</v-btn>
        </a>
      </div>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
      right
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="storeUser.profileImageUrl" v-if="storeUser"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-if="storeUser">{{ storeUser.displayName }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            @click="clickList(item.title)"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
      </v-list>
    </v-navigation-drawer>

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
    // user: '',
    userLoading: false,
    drawer: false,
    items: [
      { title: '내 카테고리', icon: 'mdi-view-dashboard' },
      { title: '즐겨찾기한 클립', icon: 'mdi-star' },
      { title: '로그아웃', icon: 'mdi-logout' }
    ]
  }),
  created() {
    this.requestAndStoreIsedol()
    this.requestUser(true)
  },
  computed: {
    storeUser: function() {
      return this.getUser()
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
    requestAndStoreIsedol() {
      this.$axios.get('/storage/isedol', {
        withCredentials: true
      })
      .then(res => {
        this.$store.dispatch('setIsedolInfo', res.data.dto)
      })
    },
    async requestUser(first) {
      console.log('requestUser')
      this.userLoading = true
      try {
        const res = await this.$axios.get('/user')
        console.log('/user: ', res.data.dto)
        this.setUser(res.data.dto)
      } catch (err) {
        console.log('/user err', err.response)
        if (first && err.response.status === 401) {
          this.refreshToken()
        } else {
          // alert('다시 로그인해 주세요')
        }
      }
      this.userLoading = false
    },
    async logout() {
      this.userLoading = true
      const res = await this.$axios.post('/logout')
      console.log(res)
      this.setUser('')
      this.userLoading = false
    },
    async refreshToken() {
      console.log('refreshToken')
      let res = ''
      try {
        res = await this.$axios.get('/refresh')
        this.setUser(res.data.dto)
        console.log('refershed')
        this.requestUser(false)
      } catch (err) {
        this.setUser('')
        // alert('다시 로그인 해 주세요')
      }
    },
    clickList(title) {
      if (title === '로그아웃') {
        this.logout()
        this.setUser('')
        this.$router.go()
      } else if (title === '내 카테고리') {
        this.$router.push('/category')
      } else if (title === '즐겨찾기한 클립') {
        this.$router.push('/favorite')
      }
    },
    getUser() {
      return this.$store.getters.getUser
    },
    setUser(user) {
      this.$store.dispatch('setUser', user)
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
