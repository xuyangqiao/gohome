<template>
  <div class="music-page"  v-infinite-scroll="fetchList" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <div class="recommend-list">
      <h1 class="list-title">热门歌手推荐</h1>

      <ul>
        <li class="list-item" v-for="(item, index) in singerList">
          <div class="icon">
            <img :src="item.img1v1Url" lazy="loaded">
          </div>
          <div class="text">
            <h2 class="name">{{item.name}}</h2>
            <!--<p class="desc">{{item.copywriter}}</p>-->
          </div>
        </li>
      </ul>
    </div>
  </div>   
</template>

<script>
  import api from '@/api'
  export default {
    data () {
      return {
        singerList: [],
        page: 1,
        limit: 40,
        busy: false
      }
    },
    created () {
      this.fetchList()
    },
    computed: {
      nextPage () {
        return {
          offset: (this.page - 1) * this.limit,
          limit: this.limit
        }
      }
    },
    methods: {
      async fetchList () {
        this.busy = true
        const {data: {code, artists}} = await api.get('/music/top/artists', this.nextPage)
        if (code === 200) {
          this.page ++
          this.singerList = this.singerList.concat(artists)
          if (artists.length < 40) {
            return
          }
          this.busy = false
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
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
    &:last-child{
      padding-bottom: 0;
    }
    .icon{
      flex: 0 0 60px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      padding-right: 10px;
      img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
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
        color: #fff;
      }
      .desc{
        color: hsla(0,0%,100%,.3);
      }
    }
  }
}
</style>
