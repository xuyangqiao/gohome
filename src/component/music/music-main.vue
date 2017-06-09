<template>
  <div class="music-main">
    <router-view></router-view>
    <div class="player" v-show="normalShow">
      <div class="normal-player" v-show="normalShow" v-if="songInfo">
        <div class="back-ground">
          <img :src="songInfo.al.picUrl" width="100%" height="100%">
        </div>
        <div class="top-bar">
          <div class="back" @click='$store.commit("miniPlayer")'>
            <i class="iconfont icon-back"></i>
          </div>
          <h1 class="title">{{songInfo.name}}</h1>
          <h2 class="subtitle">{{songInfo.ar[0].name}}-{{songInfo.al.name}}</h2>
        </div>

        <div class="middle">
          <div class="middle-l">
            <div class="cd-wrapper">
              <div class="cd">
                <img :src="songInfo.al.picUrl" class="image">
              </div>
            </div>

            <div class="playing-lyric-wrapper">
              <div class="playing-lyric">哈哈哈哈啊哈哈哈哈</div>
            </div>
          </div>
        </div>

        <div class="bottom">
          <div class="progress-wrapper">
            <span class="time time-l">4:30</span>
            <div class="progress-bar-wrapper">
              <div class="progress-bar">
                <div class="bar-inner">
                  <div class="progress"></div>
                  <div class="progress-btn-wrapper">
                    <div class="progress-btn"></div>
                  </div>
                </div>
              </div>
            </div>
            <span class="time time-r">4:30</span>
          </div>

          <div class="operators">
            <div class="icon icon-l">
              <i class="iconfont icon-suiji"></i>
            </div>
            <div class="icon icon-l">
              <i class="iconfont icon-kuaitui"></i>
            </div>
            <div class="icon i-center">
              <i class="iconfont icon-zanting"></i>
            </div>
            <div class="icon icon-r">
              <i class="iconfont icon-kuaijin"></i>
            </div>
            <div class="icon icon-r">
              <i class="iconfont icon-xiai"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
  export default {
    computed: {
      normalShow () {
        return this.$store.state.normalShow
      },
      songInfo () {
        return this.$store.state.songInfo
      }
    }
  }
</script>

<style lang="scss" scoped>
.music-main{
  position: absolute;
  top: 50px;
  left: 50px;
  z-index: 10;
  width: 375px;
  background: #222;
  height: 667px;
  .player{
    width: 100%;
    height: 100%;
    background: #222;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1000;
    .top-bar{
      width: 100%;
      top: 0;
      z-index: 100;
      line-height: 42px;
      transition: all linear .3s;
      margin-bottom: 25px;
      &.active{
        background: #222;
      }
      .back{
        position: absolute;
        top: 0;
        left: 18px;
        z-index: 50;
        cursor: pointer;
        .iconfont{
          display: inline-block;
          font-size: 22px;
          color: #ffcd32;
          transform: rotate(-90deg);
        }
      }
      .title{
        width: 70%;
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
      .subtitle{
        line-height: 20px;
        text-align: center;
        font-size: 14px;
        color: #fff;
      }
    }
    .normal-player{
      .back-ground{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        opacity: .6;
        filter: blur(20px);
      }
      .middle{
        position: absolute;
        width: 100%;
        top: 80px;
        bottom: 170px;
        white-space: nowrap;
        font-size: 0;
        .middle-l{
          display: inline-block;
          vertical-align: top;
          position: relative;
          width: 100%;
          height: 0;
          padding-top: 80%;
          .cd-wrapper{
            position: absolute;
            left: 10%;
            top: 0;
            width: 80%;
            height: 100%;
            .cd{
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              border: 10px solid hsla(0,0%,100%,.1);
              border-radius: 50%;
              position: relative;
              .image{
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                border-radius: 50%;
              }
            }
          }
          .playing-lyric-wrapper{
            width: 80%;
            margin: 30px auto 0;
            overflow: hidden;
            text-align: center;
            .playing-lyric{
              height: 20px;
              line-height: 20px;
              font-size: 14px;
              color: hsla(0,0%,100%,.5);
            }
          }
        }
      }
      .bottom{
        position: absolute;
        bottom: 50px;
        width: 100%;
        .progress-wrapper{
          display: flex;
          align-items: center;
          width: 80%;
          margin: 0 auto;
          padding: 10px 0;
          .time{
            color: #fff;
            font-size: 12px;
            flex: 0 0 30px;
            line-height: 30px;
            width: 30px;
            &.time-l{
              text-align: left;
            }
            &.time-r{
              text-align: right;
            }
          }
          .progress-bar-wrapper{
            flex: 1;
          }
        }
      }
      .progress-bar{
        height: 30px;
        .bar-inner{
          position: relative;
          top: 13px;
          height: 4px;
          background: rgba(0,0,0,.3);
          .progress{
            position: absolute;
            height: 100%;
            background: #ffcd32;
          }
          .progress-btn-wrapper{
            position: absolute;
            left: -8px;
            top: -13px;
            width: 30px;
            height: 30px;
            .progress-btn{
              position: relative;
              top: 7px;
              left: 7px;
              box-sizing: border-box;
              width: 16px;
              height: 16px;
              border: 3px solid #fff;
              border-radius: 50%;
              background: #ffcd32;
            }
          }
        }
      }
      .operators{
        display: flex;
        align-items: center;
        height: 40px;
        .icon{
          flex: 1;
          color: #ffcd32;
          .iconfont{
            font-size: 30px;
            line-height: 1;
          }
          &.icon-l{
            text-align: right;
          }
          &.icon-r{
            text-align: left;
          }
          &.i-center{
            padding: 0 20px;
            text-align: center;
            .iconfont{
              font-size: 40px;
            }
          }
        }
      }
    }
  }
}
</style>
