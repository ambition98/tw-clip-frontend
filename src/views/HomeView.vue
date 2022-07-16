<template>
  <div>
    <MainSearch />
    <v-tabs v-model="tab" grow>
      <v-tab v-for="item in items" :key="item.period">
        {{ item.title }}
      </v-tab>
      <!-- <v-tab @click="setPeriod('week')">주간 핫클립</v-tab>
      <v-tab @click="setPeriod('month')">월간 핫클립</v-tab>
      <v-tab @click="setPeriod('quarter')">분기별 핫클립</v-tab> -->
    </v-tabs>
    <div v-if="tab === 0">
      <HotClipsHome :first="2" :period="items[tab].period"/>
    </div>
    <div v-else-if="tab === 1">
      <HotClipsHome :first="2" :period="items[tab].period"/>
    </div>
    <div v-else>
      <HotClipsHome :first="2" :period="items[tab].period"/>
    </div>
    <!-- <HotClips :first="2" :period="item"/> -->
  </div>
</template>
s
<script>
import MainSearch from '@/components/MainSearch.vue'
import HotClipsHome from '@/components/HotClipsHome.vue'

export default {
  name: 'Home',
  components: {
    MainSearch,
    HotClipsHome
  },
  data() {
    return {
      items: [
        { period: 'week', title: '주간 핫클립' },
        { period: 'month', title: '월간 핫클립' },
        { period: 'quarter', title: '분기별 핫클립' }
      ],
      tab: 0
    }
  },
  methods: {
    // setPeriod(period) {
    //   this.peirod = period
    // }
  }
}
</script>
