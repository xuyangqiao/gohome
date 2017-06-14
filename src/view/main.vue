<template>
  <div class="main" v-bind:style="{ backgroundImage: bg }">
    <div class="music" @click='musicGo'></div>
    <btn-nav></btn-nav>
    <widget :infoData='info'></widget>
    <music v-show="musicShow"></music>
    <boot></boot>
  </div>
</template>

<script>
import widget from '@/component/widget'
import btnNav from '@/component/btn-nav'
import music from '@/component/music/music-main'
import boot from '@/component/boot/boot-main'
import api from '@/api'
export default {
  components: {
    widget,
    btnNav,
    music,
    boot
  },
  data () {
    return {
      info: '',
      musicShow: false,
      musicFlag: false
    }
  },
  computed: {
    bg () {
      if (this.info) {
        return 'url(' + this.info.url + ')'
      }
    }
  },
  created () {
    this.fetchMain()
  },
  methods: {
    async fetchMain () {
      const {data: {code, data}} = await api.get('/api/main')
      if (code === 200) {
        this.info = data
      }
      setTimeout(() => {
        this.fetchMain()
      }, 1800000)
    },
    musicGo () {
      this.musicShow = !this.musicShow
      this.musicFlag = false
      const reg = /music/
      if (reg.test(location.pathname)) {
        this.musicFlag = true
      }
      if (!this.musicFlag) {
        this.$router.push('music/hot')
      }
    }
  }
}

</script>

<style lang="scss" scoped>
.main{
  position: absolute;
  top: 0;
  left: 0;
  background: no-repeat center fixed;
  background-size: cover;
  width: 100%;
  height: 100%;
  transition: all linear .3s;
  .music{
    position: absolute;
    z-index: 10;
    top: 30px;
    left: 30px;
    width: 30px;
    height: 30px;
    background: url('../assets/images/icon/music.png') no-repeat center;
    background-size: cover;
    cursor: pointer;
  }
}
</style>
