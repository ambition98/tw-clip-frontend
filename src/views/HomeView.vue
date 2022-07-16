<template>
  <div>
    <MainSearch />
    {{ period }}
    <v-tabs
    >
      <v-tab @click="setPeriod('week')">주간 핫클립</v-tab>
      <v-tab @click="setPeriod('month')">월간 핫클립</v-tab>
      <v-tab @click="setPeriod('quarter')">분기별 핫클립</v-tab>
    </v-tabs>
    <HotClips :first="2" :period="period"/>
  </div>
</template>
s
<script>
import MainSearch from '@/components/MainSearch.vue'
import HotClips from '@/components/HotClipsHome.vue'

export default {
  name: 'Home',
  components: {
    MainSearch,
    HotClips
  },
  data() {
    return {
      period: 'week'
    }
  },
  methods: {
    setPeriod(period) {
      this.peirod = period
    }
  }
}
</script>
