import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api'

Vue.use(Vuex)

const state = {
  songList: [],
  normalShow: false,
  songInfo: ''
}

const mutations = {
  normalPlayer (state) {
    state.normalShow = true
  },
  miniPlayer (state) {
    state.normalShow = false
  },
  songPlayer (state, id) {
    state.songList.push(id)
    state.normalShow = true
  },
  songInfo (state, data) {
    state.songInfo = data
    state.normalShow = true
  }
}

const actions = {
  async songInfo ({ commit }, id) {
    const { data: { code, songs } } = await api.get('/music/song/detail', { ids: id })
    if (code === 200) {
      commit('songInfo', songs[0])
    }
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
