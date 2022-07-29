<template>
  <div>
    <v-dialog
      v-model="open"
      width="1070px"
    >
      <v-card>
        <iframe :src="embedUrl" width="100%" height="600" allowfullscreen preload="metadata"/>

        <v-divider></v-divider>

        <div style="width: 30%; text-align: center; margin: auto">
            <v-container>
                <v-row no-gutters style="height: 10px;">
                    <v-col v-if="videoUrl" @click="clickModalIcon('mdi-video')" style="cursor: pointer; padding: 0px">
                        <v-icon color="purple">mdi-video</v-icon>
                    </v-col>
                    <v-col v-else style="padding: 0px">
                        <v-icon disabled>mdi-video-off</v-icon>
                    </v-col>
                    <v-col v-for="n in icon" :key="n" style="cursor: pointer; padding: 0px" @click="clickModalIcon(n)">
                        <v-icon color="purple">{{ n }}</v-icon>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col v-for="n in iconDesc" :key="n" style="padding: 0px">
                        {{ n }}
                    </v-col>
                </v-row>
            </v-container>
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
        if (this.open === false) {
          this.$emit('close')
        }
      }
    },
    created() {
      this.open = this.modal

      this.url = this.clip.url
      // this.embedUrl = this.clip.embedUrl + '&parent=localhost&autoplay=true&muted=false'
      this.embedUrl = this.clip.embedUrl + '&parent=isedol-clip.xyz&autoplay=true'
      if (this.clip.videoId !== '') {
          this.videoUrl = 'https://www.twitch.tv/videos/' + this.clip.videoId + '?t=' + this.clip.vodOffset + 's'
      }
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
        } else if (icon === 'mdi-plus-box') {
            //
        }
      }
    }
}
</script>
