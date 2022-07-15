<template>
  <div>
    <MainSearch />
    <HotClips />
  </div>
</template>

<script>
import MainSearch from '@/components/MainSearch.vue'
import HotClips from '@/components/HotClips.vue'

export default {
  name: 'Home',
  components: {
    MainSearch,
    HotClips
  }
}
</script>
