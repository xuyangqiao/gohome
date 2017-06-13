<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
require('./assets/css//iconfont.scss')

export default {
  created () {
    if (!localStorage.getItem('bootUserId')) {
      const date = new Date().getTime()
      const num = parseInt(Math.random() * 100000)
      localStorage.setItem('bootUserId', date * num)
    }
  }
}
</script>

<style lang='scss'>
@import './assets/css/reset.scss';
@import './assets/css/index.scss';
</style>
