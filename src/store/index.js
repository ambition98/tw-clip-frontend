import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isedolLogins: ['vo_ine', 'jingburger', 'lilpaaaaaa', 'cotton__123', 'gosegugosegu', 'viichan6'],
    weekHotclips: [],
    monthHotclips: [],
    quarterHotclips: [],
    hotclipLoadedCnt: 0
  },
  getters: {
    getIsedolLogins(state) {
      return state.isedolLogins
    },
    getHotclips: state => period => {
      if (period === 'week') {
        return state.weekHotclips
      } else if (period === 'month') {
        return state.monthHotclips
      } else {
        return state.quarterHotclips
      }
    },
    getHotclipLoadedCnt(state) {
      return state.hotclipLoadedCnt
    }
  },
  mutations: {
    pushClip(state, payload) {
      console.log('period in mutation: ' + payload.period)
      if (payload.period === 'week') {
        state.weekHotclips.push(payload.clip)
      } else if (payload.period === 'month') {
        state.monthHotclips.push(payload.clip)
      } else {
        state.quarterHotclips.push(payload.clip)
      }
    },
    increseHotclipLoadedCnt(state) {
      state.hotclipLoadedCnt++
    }
  },
  actions: {
    pushClip({ state, commit }, payload) {
      console.log('period in action: ' + payload.period)
      commit('pushClip', payload)
    },
    increseHotClipLoadedCnt({ state, commit }) {
      commit('increseHotclipLoadedCnt')
    }
  },
  modules: {
  }
})
