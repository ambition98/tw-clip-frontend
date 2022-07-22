import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isedolLogins: ['viichan6', 'gosegugosegu', 'cotton__123', 'lilpaaaaaa', 'jingburger', 'vo_ine'],
    isedolId: ['195641865', '707328484', '203667951', '169700336', '237570548', '702754423'],
    weekHotclips: [],
    monthHotclips: [],
    quarterHotclips: [],
    hotclipLoadedCnt: 0
  },
  getters: {
    getIsedolLogins(state) {
      return state.isedolLogins
    },
    getIsedolId(state) {
      return state.isedolId
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
    },
    sortHotclip(state) {
      state.weekHotclips.sort((a, b) => {
        return b.viewCount - a.viewCount
      })
      state.monthHotclips.sort((a, b) => {
        return b.viewCount - a.viewCount
      })
      state.quarterHotclips.sort((a, b) => {
        return b.viewCount - a.viewCount
      })
    }
  },
  actions: {
    pushClip({ state, commit }, payload) {
      commit('pushClip', payload)
    },
    increseHotClipLoadedCnt({ state, commit }) {
      commit('increseHotclipLoadedCnt')
    },
    sortHotclip({ state, commit }) {
      commit('sortHotclip')
    }
  },
  modules: {
  }
})
