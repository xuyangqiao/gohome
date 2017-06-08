<template>
  <div class="music-page">
    <swiper class="banner-swiper" :options="swiperOption">
      <swiper-slide v-for="(slide, index) in bannerList" :key='slide.targetId'>
        <a :href="slide.url" target="_blank">
          <img class="slide-banner" :src="slide.pic" :alt="slide.typeTitle">
        </a>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>

    <div class="recommend-list">
      <h1 class="list-title">热门歌单推荐</h1>

      <ul>
        <li class="list-item" v-for="(item, index) in playlists" @click='listInfo(item.picUrl, item.id)'>
          <div class="icon">
            <img width="60" height="60" :src="item.picUrl" lazy="loaded">
          </div>
          <div class="text">
            <h2 class="name">{{item.name}}</h2>
            <p class="desc">{{item.copywriter}}</p>
          </div>
        </li>
      </ul>

      <h1 class="list-title">最新音乐</h1>

      <ul v-if="songList">
        <li class="song-item" v-for="(item, index) in songList">
          <div class="content">
            <h2 class="name">
              {{item.name}}
              <span class="sgalia">{{item.song.alias[0]}}</span>
            </h2>
            <p class="desc">{{item.song.artists[0].name}} - {{item.song.album.name}}</p>
          </div>
          <div class="play-icon">
            <i class="iconfont icon-iconfontbofang1"></i>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import api from '@/api'
export default {
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      swiperOption: {
        autoplay: 3500,
        setWrapperSize: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        mousewheelControl: true,
        observeParents: true,
        loop: true
      },
      bannerList: '',
      playlists: '',
      songList: ''
    }
  },
  created () {
    this.fetchBanner()
    this.fetchHotList()
    this.fetchSongList()
  },
  methods: {
    async fetchBanner () {
      const {data: {code, banners}} = await api.get('/music/banner')
      if (code === 200) {
        this.bannerList = banners
      }
    },
    async fetchHotList () {
      const {data: {code, result}} = await api.get('/music/personalized')
      if (code === 200) {
        this.playlists = result
      }
    },
    async fetchSongList () {
      const {data: {code, result}} = await api.get('/music/personalized/newsong')
      if (code === 200) {
        this.songList = result
      }
    },
    listInfo (url, listId) {
      window.localStorage.infoUrl = url
      this.$router.push({name: 'listinfo', params: {listid: listId}})
    }
  }
}
</script>

<style lang="scss" scoped>
.music-page {
  .banner-swiper {
    .slide-banner{
      width: 100%;
      height: 100%;
    }
    .swiper-pagination-bullet{
      transition: all linear .3s;
    }
    .swiper-pagination-bullet-active{
      background: #fff;
    }
  }
}
.recommend-list{
  .list-title{
    height: 65px;
    line-height: 65px;
    text-align: center;
    font-size: 14px;
    color: #ffcd32;
  }
  .list-item{
    display: flex;
    box-sizing: border-box;
    align-items: center;
    padding: 0 20px 20px;
    cursor: pointer;
    &:last-child{
      padding-bottom: 0;
    }
    .icon{
      flex: 0 0 60px;
      width: 60px;
      padding-right: 20px;
    }
    .text{
      display: flex;
      flex-direction: column;
      flex: 1;
      line-height: 20px;
      overflow: hidden;
      font-size: 14px;
      justify-content: center;
      .name{
        margin-bottom: 10px;
        color: #fff;
      }
      .desc{
        color: hsla(0,0%,100%,.3);
      }
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
    .play-icon{
      height: 100%;
      line-height: 64px;
      padding: 0 0 0 10px;
      .iconfont{
        color: #f0f0f0;
        font-size: 24px;
      }
    }
  }
}
</style>
