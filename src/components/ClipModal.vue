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
          <div v-if="videoUrl" @click="clickModalIcon('video')" class="icon-container">
            <div class="icon"><v-icon color="purple lighten-1">mdi-video</v-icon></div>
            <div class="icon-desc">원본동영상</div>
          </div>
          <div v-else class="icon-container">
            <div class="icon"><v-icon disabled color="purple lighten-1">mdi-video-off</v-icon></div>
            <div class="icon-desc">원본동영상</div>
          </div>
          <div @click="clickModalIcon('link')" class="icon-container">
            <div class="icon"><v-icon color="purple lighten-1">mdi-link</v-icon></div>
            <div class="icon-desc">링크복사</div>
          </div>
          <div @click="clickModalIcon('plus-box')" class="icon-container">
            <div class="icon"><v-icon color="purple lighten-1">mdi-star</v-icon></div>
            <div class="icon-desc">즐겨찾기</div>
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
          icon: ['mdi-link', 'mdi-plus-box'],
          iconDesc: ['원본동영상', '링크복사', '카테고리추가'],
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
      // this.embedUrl = this.clip.embedUrl + '&parent=isedol-clip.xyz&autoplay=true'
      if (this.clip.videoId !== '') {
          this.videoUrl = 'https://www.twitch.tv/videos/' + this.clip.videoId + '?t=' + this.clip.vodOffset + 's'
      }
    },
    methods: {
      clickModalIcon(icon) {
        if (icon === 'video') {
            console.log(this.videoUrl)
            window.open(this.videoUrl)
        } else if (icon === 'link') {
            this.$copyText(this.url)
            this.snackbarText = '복사되었습니다.'
            this.snackbar = true
        } else if (icon === 'plus-box') {
            //
        }
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
  cursor: pointer;
}
</style>
