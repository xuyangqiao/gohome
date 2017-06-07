<template>
  <div class="music-top">
    <div class="music-tab">
      <router-link tag='div' to='/music/hot' class="tab-item">
        <span class="tab-link">推荐</span>
      </router-link>
      <router-link tag='div' to='/music/songlist' class="tab-item">
        <span class="tab-link">歌单</span>
      </router-link>
      <router-link tag='div' to='/music/singerlist' class="tab-item">
        <span class="tab-link">歌手</span>
      </router-link>
      <router-link tag='div' to='/music/musicsearch' class="tab-item">
        <span class="tab-link">搜索</span>
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss'>
.music-tab {
  display: flex;
  height: 44px;
  line-height: 44px;
  font-size: 14px;
  .tab-item {
    flex: 1;
    text-align: center;
    cursor: pointer;
    &.router-link-active {
      .tab-link {
        color: #ffcd32;
        border-bottom: 2px solid #ffcd32;
      }
    }
    .tab-link {
      padding-bottom: 5px;
      color: hsla(0, 0%, 100%, .5);
    }
  }
}
</style>
