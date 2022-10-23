<template>
  <v-app>
    <div class="header">
      <div class="title" @click="goToMain">
        <v-img
          class="isedol-logo"
          contain
          src="@/assets/isedol_logo.png"
          transition="scale-transition"
          width="50"
        />
      <div class="title-text">이세돌 핫클립</div>
      </div>
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
        <!-- <a href="https://id.twitch.tv/oauth2/authorize?client_id=riz806ynb687m6a7piyz3jyl4q4p3a&redirect_uri=http://localhost:8080/afterlogin&response_type=code"> -->
        <a href="https://id.twitch.tv/oauth2/authorize?client_id=riz806ynb687m6a7piyz3jyl4q4p3a&redirect_uri=https://isedol-clip.xyz/afterlogin&response_type=code">
          <v-btn class="login-btn" color="purple" elevation="2">로그인</v-btn>
        </a>
      </div>
    </div>
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

      <v-list>
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

    <div class="main">
    <v-main>
      <router-view :key="$route.fullPath"/>
    </v-main>
    </div>
    <div class="footer">
      <div class="email"><v-icon color="white">mdi-email</v-icon> ambition65@naver.com <span> - 버그제보, 기능개선 및 기능추가건의, 특정클립 노출금지 요청</span></div>

      <v-spacer></v-spacer>
      <div class="github-wrapper">
        <div class="github" @click="goToGithubFront">
          <v-img
              class="github-logo"
              src="@/assets/github_logo.png"
              max-width="30"
          /> <div class="github-text">Frontend</div>
        </div>
        <div class="github" @click="goToGithubBack">
          <v-img
              class="github-logo"
              src="@/assets/github_logo.png"
              max-width="30"
          /> <div class="github-text">Backend</div>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  created() {
    if (this.getUser()) {
      this.$callUserApi(this.checkJwtValid)
    }
  },
  data: () => ({
    userLoading: false,
    drawer: false,
    items: [
      { title: '내 카테고리', icon: 'mdi-view-dashboard' },
      { title: '즐겨찾기한 클립', icon: 'mdi-star' },
      { title: '로그아웃', icon: 'mdi-logout' }
    ]
  }),
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
    goToMain() {
      console.log(document.URL)
      console.log(window.location.href)
      if (document.URL === 'http://localhost:8080/' || document.URL === 'https://isedol-clip.xyz/') {
        this.$router.go()
      } else {
        this.$router.push('/')
      }
    },
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
    checkJwtValid() {
      this.$axios.get('/user/verify')
      .then(res => {
        console.log('GET /user/verify: ', res.data)
      }).catch(err => {
        console.log('GET /user/verify err: ', err.response)
      })
    },
    clickList(title) {
      if (title === '로그아웃') {
        // this.logout()
        this.$logout()
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
.header {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  background-color: #5E35B1;
  padding: 8px 10px;
}
.isedol-logo {
  margin-right: 10px;
}
.title {
  display: flex;
  align-items: center;
  color: white;
  cursor: pointer;
}
.title-text {
  font-size: 1.3rem;
}
.login-btn {
  color: white;
}
.user-name {
  color: white;
}
.main {
  margin-bottom: 50px;
}
.footer {
  position:absolute;
  flex-wrap: wrap;
  bottom:0;
  width:100%;
  background:#616161;
  padding: 3px 10px;
  margin-top: 10px;
  display: flex;
  align-items: center;
}
.github-wrapper {
  display: flex;
}
.github {
  margin-left: 10px;
  color: white;
  display: inline;
}
.github-logo {
  margin: auto;
}
.email {
  color: white;
  margin-left: 10px;
  display: inline;
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
.container {
  margin-bottom: 150px;
}
</style>
