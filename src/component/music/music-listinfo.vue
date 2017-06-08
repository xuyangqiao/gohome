<template>
  <div class="list-info" ref='listInfo' v-if="playlist">
    <div class="head-bar" :class='{active: headActive}'>
      <div class="back" @click='$router.go(-1)'>
        <i class="iconfont icon-back"></i>
      </div>
      <h1 class="title">{{playlist.name}}</h1>
    </div>
    <div class="bg-image" :style='{backgroundImage: bgUrl}'>
      <div class="tags">
        <span class="tag" v-for="(item, index) in playlist.tags">{{item}}</span>
      </div>
      <div class="play-wrap">
        <div class="play">
          <i class="iconfont icon-bofang"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter"></div>
    </div>

    <ul v-if="playlist.tracks">
      <li class="song-item" v-for="(item, index) in playlist.tracks">
        <div class="content">
          <h2 class="name">
            {{item.name}}
          </h2>
          <p class="desc">{{item.ar[0].name}} - {{item.al.name}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import api from '@/api'
  export default {
    data () {
      return {
        playlist: '',
        headActive: false
      }
    },
    created () {
      this.fetchData()
    },
    computed: {
      bgUrl () {
        return `url(${this.playlist.creator.backgroundUrl})`
      }
    },
    methods: {
      async fetchData () {
        const {data: {code, playlist}} = await api.get('/music/playlist/detail', {id: this.$route.params.listid})
        if (code === 200) {
          this.playlist = playlist
          this.$nextTick(() => {
            document.querySelector('.list-info').addEventListener('scroll', () => {
              const scrollTop = this.$refs.listInfo.scrollTop
              if (scrollTop > 0) {
                this.headActive = true
              } else {
                this.headActive = false
              }
            })
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  .list-info{
    height: 100%;
    overflow: auto;
  }
  .head-bar{
    position: absolute;
    display: flex;
    width: 100%;
    top: 0;
    z-index: 100;
    height: 42px;
    line-height: 42px;
    transition: all linear .3s;
    &.active{
      background: #222;
    }
    .back{
      position: absolute;
      top: 0;
      left: 6px;
      z-index: 50;
      cursor: pointer;
      .iconfont{
        font-size: 22px;
        color: #ffcd32;
      }
    }
    .title{
      width: 80%;
      text-align: center;
      font-size: 18px;
      color: #fff;
      text-align: center;
      margin: 0 auto;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      text-align: center;
    }
  }
  .bg-image{
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    -webkit-transform-origin: top;
    transform-origin: top;
    background-size: cover;
    .tags{
      width: 100%;
      text-align: center;
      padding: 0 20px;
      position: absolute;
      bottom: 100px;
      color: #fff;
      box-sizing: border-box;
      .tag{
        display: inline-block;
        margin: 6px;
        padding: 2px 6px;
        border: 1px solid #fff;
        border-radius: 6px;
        font-size: 10px;
      }
    }
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

  .song-item{
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 64px;
    font-size: 14px;
    padding: 0 20px;
    .content{
      flex: 1;
      line-height: 20px;
      overflow: hidden;
      .name{
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        color: #fff;
        .sgalia{
          color: #ddd;
        }
      }
      .desc{
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        margin-top: 4px;
        color: hsla(0,0%,100%,.3);
      }
    }
  }
</style>
