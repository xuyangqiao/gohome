<template>
  <div class="main" v-bind:style="{ backgroundImage: bg }">
    <btn-nav></btn-nav>
    <widget :infoData='info'></widget>
    <music></music>
  </div>
</template>

<script>
import widget from '@/component/widget'
import btnNav from '@/component/btn-nav'
import music from '@/component//music/music-main'
import api from '@/api'
export default {
  components: {
    widget,
    btnNav,
    music
  },
  data () {
    return {
      info: ''
    }
  },
  computed: {
    bg () {
      if (this.info) {
        return 'url(' + this.info.url + ')'
      }
    }
  },
  async created () {
    const {data: {code, data}} = await api.get('/api/main')
    if (code === 200) {
      this.info = data
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
}
</style>
