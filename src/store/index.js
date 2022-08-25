import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// const vuexPersist = new VuecPersistedState({
//   plugins: [createPersistedState()]
// })

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isedolInfo: [],
    hotclipLoadedCnt: 0,
    user: ''
  },
  getters: {
    getIsedolInfo(state) {
      return state.isedolInfo
    },
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
    },
    getUser(state) {
      return state.user
    }
  },
  mutations: {
    setIsedolInfo(state, isedolInfo) {
      state.isedolInfo = isedolInfo
    },
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
    },
    setUser(state, user) {
      state.login = true
      state.user = user
    }
  },
  actions: {
    setIsedolInfo({ state, commit }, isedolInfo) {
      commit('setIsedolInfo', isedolInfo)
    },
    pushClip({ state, commit }, payload) {
      commit('pushClip', payload)
    },
    increseHotClipLoadedCnt({ state, commit }) {
      commit('increseHotclipLoadedCnt')
    },
    sortHotclip({ state, commit }) {
      commit('sortHotclip')
    },
    setUser({ state, commit }, user) {
      commit('setUser', user)
    }
  },
  plugins: [
    createPersistedState()
  ]
})
