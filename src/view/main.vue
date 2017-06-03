<template>
  <div class="main" v-bind:style="{ backgroundImage: bg }">
    <widget></widget>
  </div>
</template>

<script>
import widget from '@/component/widget'
import api from '@/api'
export default {
  components: {
    widget
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
