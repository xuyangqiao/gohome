<template>
  <div class="wrap-widget">
    <timer></timer>
    <search :infoData='infoData'></search>
  </div>
</template>

<script>
import search from '@/component/search'
import timer from '@/component/time'
export default {
  components: {
    search,
    timer
  },
  props: ['infoData']
}
</script>

<style lang="scss">
.wrap-widget{
  text-align: center;
  width: 100%;
  position: absolute;
  top: 27%;
  z-index: 1;
  text-shadow: 0 1px 5px rgba(0,0,0,.5);
  transition: all .2s ease-in-out;
}
</style>
