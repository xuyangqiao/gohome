import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api'

Vue.use(Vuex)

const state = {
  songList: {},
  normalShow: false,
  songInfo: '',
  lrc: '',
  playType: 1 // 1 => 列表循环 2 => 列表顺序 3 => 单曲循环
}

const mutations = {
  normalPlayer (state) {
    state.normalShow = true
  },
  miniPlayer (state) {
    state.normalShow = false
  },
  songPlayer (state, data) {
    state.songList = data
    state.normalShow = true
  },
  songInfo (state, data) {
    state.songInfo = data
    state.normalShow = true
  },
  changeType (state, type) {
    state.playType = type
  },
  updatePreMusic (state) {
    state.songList.pre = state.songList.current
  },
  clearPreMusic (state) {
    state.songList.pre = ''
  },
  updateLrc (state, data) {
    state.lrc = data
  }
}

const actions = {
  async songInfo ({ dispatch, commit }, obj) {
    let song
    commit('songPlayer', obj)
    const { data } = await api.get('/music/song/detail', { ids: obj.current })
    if (data.code === 200) {
      song = data.songs[0]
      dispatch('getMusicUrl', song)
    }
  },
  async getMusicUrl ({ dispatch, commit }, obj) {
    let url
    const { data } = await api.get('/music/music/url', { id: obj.id })
    if (data.code === 200) {
      url = data.data[0]
    }
    const info = Object.assign(obj, url)
    commit('songInfo', info)
    dispatch('getLrc', info)
  },
  async getLrc ({ dispatch, commit }, obj) {
    const { data } = await api.get('/music/lyric', { id: obj.id })
    if (data.code === 200) {
      let lrc = data.lrc.lyric
      var lyrics = lrc.split('\n')
      var lrcObj = {}
      for (var i = 0; i < lyrics.length; i++) {
        var lyric = decodeURIComponent(lyrics[i])
        var timeReg = /\[\d*:\d*((\.|:)\d*)*\]/g
        var timeRegExpArr = lyric.match(timeReg)
        if (!timeRegExpArr) continue
        var clause = lyric.replace(timeReg, '')
        for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
          var t = timeRegExpArr[k]
          var min = Number(String(t.match(/\[\d*/i)).slice(1))
          var sec = Number(String(t.match(/:\d*/i)).slice(1))
          var time = min * 60 + sec
          lrcObj[time] = clause
        }
      }
      commit('updateLrc', lrcObj)
    }
  },
  nextMusic ({ dispatch, commit }) {
    commit('updatePreMusic')
    let num
    switch (state.playType) {
      case 1:
        num = Math.round(Math.random() * state.songList.list.length)
        state.songList.current = state.songList.list[num].id
        break
      case 2:
        for (let i = 0; i < state.songList.list.length; i++) {
          if (state.songList.list[i].id === state.songList.current) {
            let flag = i + 1
            if (flag >= state.songList.list.length) {
              flag = 0
            }
            state.songList.current = state.songList.list[flag].id
            break
          }
        }
        break
      default:
        state.songList.current = state.songList.current
    }
    dispatch('songInfo', state.songList)
  },
  preMusic ({ dispatch, commit }) {
    if (state.songList.pre) {
      state.songList.current = state.songList.pre
      commit('clearPreMusic')
      dispatch('songInfo', state.songList)
    } else {
      dispatch('nextMusic')
    }
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
