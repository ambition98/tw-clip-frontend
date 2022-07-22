<template>
  <div>
    <MainSearch />
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
      <HotClipsHome :period="items[tab].period" @openModal="openModal" />
    </div>
    <div v-else-if="tab === 1">
      <HotClipsHome :period="items[tab].period" @openModal="openModal" />
    </div>
    <div v-else>
      <HotClipsHome :period="items[tab].period" @openModal="openModal" />
    </div>
    <!-- <ClipModal @close="closeModal" v-if="modal" @closeModal="closeModal" /> -->
  </div>
</template>
<script>
import MainSearch from '@/components/MainSearch.vue'
import HotClipsHome from '@/components/HotClipsHome.vue'
// import ClipModal from '@/components/ClipModal.vue'

export default {
  name: 'Home',
  components: {
    MainSearch,
    HotClipsHome
    // ClipModal
  },
  data() {
    return {
      items: [
        { period: 'week', title: '주간 핫클립' },
        { period: 'month', title: '월간 핫클립' },
        { period: 'quarter', title: '분기별 핫클립' }
      ],
      tab: 0,
      modal: false
    }
  },
  methods: {
    openModal() {
      console.log('open')
      this.modal = true
    },
    closeModal() {
      console.log('close')
      this.modal = false
    }
  }
}
</script>
