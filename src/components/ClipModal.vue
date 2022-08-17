<template>
  <div>
    <v-dialog
      v-model="open"
      width="1080px"
      dark
    >
      <v-card>
        <div class="iframe-container">
          <iframe :src="embedUrl" frameborder="0px" allowfullscreen preload="metadata"/>
        </div>

        <v-divider></v-divider>

        <div class="icon-row">
            <!-- @click="clickModalIcon(item.icon)" -->
          <div
              class="icon-container"
              v-for="item in items"
              :key="item.title"
              :style="item.style"
              >
            <div class="icon">
              <v-btn icon @click="clickModalIcon(item.icon)">
                <v-icon color="purple lighten-1" :disabled="item.disabled" >{{ item.icon }}</v-icon>
              </v-btn>
            </div>
            <div class="icon-desc">{{ item.title }}</div>
          </div>
        </div>
      </v-card>
    </v-dialog>
    <Snackbar v-if="snackbar" :snackbar="snackbar" :text="snackbarText" @close="snackbar=false"/>
  </div>
</template>
<script>
import Snackbar from '@/components/Snackbar.vue'

export default {
    name: 'ClipModal',
    components: {
      Snackbar
    },
    props: ['modal', 'clip'],
    data() {
        return {
          items: [
            { icon: 'mdi-video', title: '원본동영상', disabled: false, style: '' },
            { icon: 'mdi-link', title: '링크복사', disabled: false, style: '' },
            { icon: 'mdi-star-outline', title: '즐겨찾기 추가', disabled: false, style: '' },
            { icon: 'mdi-plus-box', title: '카테고리추가', disabled: false, style: '' }
          ],
          snackbar: false,
          snackbarText: '',
          open: '',
          url: '',
          embedUrl: '',
          videoId: ''
        }
    },
    watch: {
      open: function() {
        if (!this.open) {
          this.$emit('close')
        }
      }
    },
    created() {
      this.open = this.modal
      this.url = this.clip.url
      this.embedUrl = this.clip.embedUrl + '&parent=localhost&muted=false'
      // this.embedUrl = this.clip.embedUrl + '&parent=isedol-clip.xyz&autoplay=false&muted=false'
      if (this.clip.videoId !== '') {
          this.videoUrl = 'https://www.twitch.tv/videos/' + this.clip.videoId + '?t=' + this.clip.vodOffset + 's'
      } else {
        this.items[0].icon = 'mdi-video-off'
        this.items[0].disabled = true
        this.items[0].style = 'cursor: auto;'
      }

      this.setFavoriteIcon(true)
    },
    methods: {
      clickModalIcon(icon) {
        if (icon === 'mdi-video') {
          console.log(this.videoUrl)
          window.open(this.videoUrl)
        } else if (icon === 'mdi-link') {
          this.$copyText(this.url)
          this.snackbarText = '복사되었습니다.'
          this.snackbar = true
        } else if (icon === 'mdi-star-outline') {
          console.log('post')
          this.postFavorite(true)
        } else if (icon === 'mdi-star') {
          console.log('delete')
          this.deleteFavorite(true)
        } else if (icon === 'mdi-plus-box') {
            //
        }
      },
      postFavorite(first) {
        const data = { clipId: this.clip.id }
        this.$axios.post('/user/favorite', data)
        .then(res => {
          console.log(res.data)
            this.snackbarText = '즐겨찾기에 추가되었습니다.'
            this.snackbar = true
            this.items[2].icon = 'mdi-star'
        }).catch(err => {
          const status = err.response.status
          if (first && status === 401) {
            this.refreshToken(this.postFavorite)
          } else if (status === 409) {
            this.snackbarText = '이미 즐겨찾기된 클립입니다.'
            this.snackbar = true
          } else {
            alert('다시 로그인해 주세요')
          }
        })
      },
      deleteFavorite(first) {
        this.$axios.delete('/user/favorite/' + this.clip.id)
        .then(res => {
          console.log(res.data)
            this.snackbarText = '즐겨찾기에서 삭제되었습니다.'
            this.snackbar = true
            this.items[2].icon = 'mdi-star-outline'
        }).catch(err => {
          const status = err.response.status
          if (first && status === 401) {
            this.refreshToken(this.postFavorite)
          } else if (status === 409) {
            // alert('이미 추가된 클립입니다.')
            this.snackbarText = '이미 즐겨찾기된 클립입니다.'
            this.snackbar = true
          } else {
            alert('다시 로그인해 주세요')
          }
        })
      },
      setFavoriteIcon(first) {
        this.$axios.get('/user/favorite/exists', {
          params: {
            clipId: this.clip.id
          }
        }).then(res => {
          console.log('exists: ', res.data.dto)
          if (res.data.dto) {
            this.items[2].icon = 'mdi-star'
          }
        }).catch(err => {
          const status = err.response.status
          if (first && status === 401) {
            this.refreshToken(this.setFavoriteIcon)
          }
        })
      },
      async refreshToken(method) {
        try {
          const res = await this.$axios.get('/refresh')
          this.setUser(res.data.dto)
          method(false)
        } catch (err) {
          alert('다시 로그인해 주세요')
        }
      },
      setUser(user) {
        this.$store.dispatch('setUser', user)
      }
    }
}
</script>
<style scoped>
.iframe-container {
  position: relative;
  width: 100%;
  min-height: 500px;
  padding-bottom: 56.25%;
}
.iframe-container iframe {
  position: absolute;
  width: 100%;
  height: 100%;
}
.icon-row {
  text-align: center;
  margin: auto;
}
.icon-container {
  display: inline-block;
  margin: 10px;
  /* cursor: pointer; */
}
</style>
