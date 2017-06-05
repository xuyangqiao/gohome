<template>
  <div class="main" v-bind:style="{ backgroundImage: bg }">
    <btn-nav></btn-nav>
    <widget :infoData='info'></widget>
  </div>
</template>

<script>
import widget from '@/component/widget'
import btnNav from '@/component/btn-nav'
import api from '@/api'
export default {
  components: {
    widget,
    btnNav
  },
  data () {
    return {
      info: ''
    }
  },
  computed: {
    bg () {
      return 'url(' + this.info.url + ')'
    }
  },
  async created () {
    // http://bing.ioliu.cn/v1/rand?w=1920&h=1080&type=json
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
