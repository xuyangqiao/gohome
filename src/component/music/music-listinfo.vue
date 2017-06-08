<template>
  <div class="list-info">
    <div class="bg-image">
      <div class="play-wrap">
        <div class="play">
          <i class="iconfont icon-bofang"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter"></div>
    </div>
  </div>
</template>

<script>
  import api from '@/api'
  export default {
    data () {
      return {
        playlist: ''
      }
    },
    created () {
      this.fetchData()
    },
    methods: {
      async fetchData () {
        const {data: {code, playlist}} = await api.get('/music/playlist/detail', {id: this.$route.params.listid})
        if (code === 200) {
          this.playlist = playlist
        }
      }
    }
  }
</script>

<style lang="scss">
  .bg-image{
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    -webkit-transform-origin: top;
    transform-origin: top;
    background-size: cover;
    .play-wrap{
      position: absolute;
      bottom: 20px;
      z-index: 50;
      width: 100%;
      .play{
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        cursor: pointer;
        border: 1px solid #ffcd32;
        color: #ffcd32;
        border-radius: 100px;
        font-size: 0;
        .iconfont{
          display: inline-block;
          vertical-align: middle;
          margin-right: 6px;
          font-size: 16px;
        }
        .text{
          display: inline-block;
          vertical-align: middle;
          font-size: 12px;
        }
      }
    }
    .filter{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7,17,27,.4);
    }
  }
</style>
