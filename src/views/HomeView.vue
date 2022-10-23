<template>
  <v-container>
    <BroadcasterSearch />
    <v-tabs
      v-model="tab"
      color="purple"
      grow
    >
      <!-- background-color="purple lighten-5" -->
      <v-tab v-for="item in items" :key="item.period">
        {{ item.title }}
      </v-tab>
    </v-tabs>
    <div v-if="tab === 0">
      <HotClipsHome :period="items[tab].period" key="0" />
    </div>
    <div v-else-if="tab === 1">
      <HotClipsHome :period="items[tab].period" key="1"/>
    </div>
    <div v-else>
      <HotClipsHome :period="items[tab].period" key="2"/>
    </div>
  </v-container>
</template>
<script>
import BroadcasterSearch from '@/components/BroadcasterSearch.vue'
import HotClipsHome from '@/components/HotClipsHome.vue'

export default {
  name: 'Home',
  components: {
    BroadcasterSearch,
    HotClipsHome
  },
  data() {
    return {
      items: [
        { period: 'day', title: '일간 핫클립' },
        { period: 'week', title: '주간 핫클립' },
        { period: 'month', title: '월간 핫클립' }
      ],
      tab: 0
    }
  }
}
</script>
