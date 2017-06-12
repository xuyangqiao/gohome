<template>
  <div class="music-main">
    <router-view></router-view>
    <div class="player">
      <audio :src="mp3Url" id="audio" ref="audio" @canplay="audioInit" @ended="ended"></audio>
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
              <div class="cd play" :class='{pause: !play}'>
                <img :src="songInfo.al.picUrl" class="image">
              </div>
            </div>

            <div class="playing-lyric-wrapper">
              <div class="playing-lyric">{{lrc}}</div>
            </div>
          </div>
        </div>

        <div class="bottom">
          <div class="progress-wrapper">
            <span class="time time-l">{{current}}</span>
            <div class="progress-bar-wrapper" ref="bar">
              <div class="progress-bar">
                <div class="bar-inner">
                  <div class="progress" :style="{width: progressWidth}"></div>
                  <div class="progress-btn-wrapper" :style="{transform: 'translateX('+ progressWidth +')'}">
                    <div class="progress-btn"></div>
                  </div>
                </div>
              </div>
            </div>
            <span class="time time-r">{{end}}</span>
          </div>

          <div class="operators">
            <div class="icon icon-l">
              <i class="iconfont icon-suiji" @click='changeType' v-if="playType === 1"></i>
              <i class="iconfont icon-liebiaoxunhuan" @click='changeType' v-else-if="playType === 2"></i>
              <i class="iconfont icon-danquxunhuan" @click='changeType' v-else></i>
            </div>
            <div class="icon icon-l">
              <i class="iconfont icon-kuaitui" @click='preMusic'></i>
            </div>
            <div class="icon i-center">
              <i class="iconfont icon-bofang1" @click='pauseMusic' v-if="play"></i>
              <i class="iconfont icon-zanting" @click='playMusic' v-else></i>
            </div>
            <div class="icon icon-r">
              <i class="iconfont icon-kuaijin" @click='nextMusic'></i>
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
    data () {
      return {
        update: '',
        current: '00:00',
        end: '00:00',
        play: false,
        progressWidth: 0,
        lrc: ''
      }
    },
    computed: {
      normalShow () {
        return this.$store.state.normalShow
      },
      songInfo () {
        return this.$store.state.songInfo
      },
      mp3Url () {
        return this.$store.state.songInfo.url
      },
      playType () {
        return this.$store.state.playType
      }
    },
    methods: {
      audioInit () {
        const duration = document.querySelector('#audio').duration
        this.end = this.transformTime(duration)
        this.current = this.transformTime(0)
        this.playMusic()
      },
      playMusic () {
        if (!this.mp3Url) {
          return
        }
        this.update = setInterval(this.getCurrent, 1000)
        this.$refs.audio.play()
        this.play = true
        document.querySelector('#audio').ontimeupdate = () => {
          const playCurrentTime = Math.round(document.querySelector('#audio').currentTime)
          if (!this.$store.state.lrc[playCurrentTime]) {
            return
          }
          this.lrc = this.$store.state.lrc[playCurrentTime]
        }
      },
      pauseMusic () {
        clearInterval(this.update)
        this.$refs.audio.pause()
        this.play = false
      },
      ended () {
        clearInterval(this.update)
        this.play = false
        this.progressWidth = 0
        this.nextMusic()
      },
      nextMusic () {
        this.$store.dispatch('nextMusic')
      },
      preMusic () {
        this.$store.dispatch('preMusic')
      },
      getCurrent () {
        const currentTime = this.$refs.audio.currentTime
        const max = this.$refs.audio.duration
        this.progressWidth = parseFloat(currentTime) / parseFloat(max) * 2.2 * 100 + 'px'
        this.current = this.transformTime(currentTime)
      },
      changeType () {
        let type = this.playType + 1
        if (type > 3) {
          type = 1
        }
        this.$store.commit('changeType', type)
      },
      transformTime (seconds) {
        let m
        let s
        m = Math.floor(seconds / 60)
        m = m.toString().length === 1 ? ('0' + m) : m
        s = Math.floor(seconds - 60 * m)
        s = s.toString().length === 1 ? ('0' + s) : s
        return m + ':' + s
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
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: #222;
      z-index: 1000;
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
              &.play{
                animation: rotate 20s linear infinite;
              }
              &.pause{
                animation-play-state: paused;
              }
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
              margin-right: 10px;
            }
            &.time-r{
              text-align: right;
              margin-left: 10px;
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
            left: -15px;
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
@keyframes rotate{
  0%{
    transform:rotate(0)
    }
  to{
    transform:rotate(1turn)}
  }
</style>
