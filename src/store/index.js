import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isedolLogins: ['vo_ine', 'jingburger', 'lilpaaaaaa', 'cotton__123', 'gosegugosegu', 'viichan6'],
    weekHotclips: [],
    weekHotclipLoadedCnt: 0,
    monthHotclips: [],
    monthHotclipLoadedCnt: 0,
    quarterHotclips: [],
    quarterHotclipLoadedCnt: 0
  },
  getters: {
    getIsedolLogins(state) {
      return state.isedolLogins
    },
    getHotClips: state => period => {
      if (period === 'week') {
        return state.weekHotclips
      } else if (period === 'month') {
        return state.monthHotclips
      } else {
        return state.quarterHotclips
      }
    },
    getHotClipCnt: state => period => {
      if (period === 'week') {
        return state.weekHotclipLoadedCnt
      } else if (period === 'month') {
        return state.monthHotclipLoadedCnt
      } else {
        return state.quarterHotclipLoadedCnt
      }
    }
    // getWeekHotclipLoadedCnt(state) {
    //   return state.weekHotclipLoadedCnt
    // },
    // getWeekHotclips(state) {
    //   return state.weekHotclips
    // },
    // getMonthHotclipLoadedCnt(state) {
    //   return state.monthHotclipLoadedCnt
    // },
    // getMonthHotclips(state) {
    //   return state.monthHotclips
    // },
    // getQuarterHotclipLoadedCnt(state) {
    //   return state.quarterHotclipLoadedCnt
    // },
    // getQuarterHotclips(state) {
    //   return state.quarterHotclips
    // },
  },
  mutations: {
    pushClip(state, clip, period) {
      if (period === 'week') {
        state.weekHotclips.push(clip)
      } else if (period === 'month') {
        state.monthHotclips.push(clip)
      } else {
        state.quarterHotclips.push(clip)
      }
    },
    increseHotclipLoadedCnt(state, period) {
      if (period === 'week') {
        state.weekHotclipLoadedCnt++
      } else if (period === 'month') {
        state.monthHotclipLoadedCnt++
      } else {
        state.quarterHotclipLoadedCnt++
      }
    }
  },
  actions: {
    pushClip({ state, commit }, clip, period) {
      commit('pushClip', clip, period)
    },
    increseHotClipLoadedCnt({ state, commit }, period) {
      commit('increseHotclipLoadedCnt', period)
    }
  },
  modules: {
  }
})
