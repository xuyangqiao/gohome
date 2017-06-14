<template>
  <div class="boot-container">
    <div class="boot-show" @click='bootShow = !bootShow'></div>
    <transition name="boot-show" enter-active-class="animated bounceIn" leave-active-class="animated hinge">
      <div class="dialogue" v-if="bootShow">
        <div class="displayArea" ref='wrodWrap'>
          <div class="diswap" ref="word">
            <div class="clearfix" v-for="(item, index) in msgArr" :class='item.user === 1?"me-word":"boot-word"'>
              <span class="head"></span>
              <p class="text" v-if="item.user === 1">
                {{item.msg}}
                <i class="before"></i>
              </p>
              <p class="text" v-else>
                {{item.msg}}
                <a :href="item.url" v-if="item.url" target="_blank">打开页面</a>
                <i class="before"></i>
              </p>
            </div>
          </div>
        </div>
        <div class="writeArea clearfix">
          <input type="text" maxlength="200" class="input-text" placeholder="请输入你想说的" v-model="msg" @keyup.enter='sendMsg'>
          <button class="send-btn" @click='sendMsg'>发 送</button>
        </div>
      </div>  
    </transition>
  </div>  
</template>

<script>
  import io from 'socket.io-client'
  export default {
    data () {
      return {
        msg: '',
        socket: '',
        msgArr: [],
        bootShow: false
      }
    },
    watch: {
      msgArr () {
        if (this.$refs.wrodWrap) {
          this.$nextTick(() => {
            this.$refs.wrodWrap.scrollTop = this.$refs.word.offsetHeight
          })
        }
      }
    },
    created () {
      this.initConnect()
    },
    methods: {
      sendMsg () {
        if (!this.msg) {
          return
        }
        const obj = {
          province: localStorage.getItem('province'),
          city: localStorage.getItem('city'),
          msg: this.msg,
          userId: localStorage.getItem('bootUserId')
        }
        this.socket.emit('news', obj)
        this.msgArr.push({
          user: 1,
          msg: this.msg
        })
        this.msg = ''
      },
      initConnect () {
        this.socket = io.connect('http://time.superxu.cc')
        this.socket.on('news', (data) => {
          this.msgArr.push(data)
        })
      }
    }
  }
</script>

<style lang="scss">
.boot-container{
  .boot-show{
    position: fixed;
    right: 50px;
    bottom: 50px;
    background: url('../../assets/images/boot-show.png') no-repeat center center;
    background-size: cover;
    width: 50px;
    height: 50px;
    cursor: pointer;
    transform: rotateY(180deg);
  }
  position: fixed;
  z-index: 100;
  .dialogue{
    position: fixed;
    bottom: 93px;
    right: 85px;
    float: left;
    width: 564px;
    height: 508px;
    border: #dbdada solid 1px;
    box-shadow: 0 0 5px 0 #dbdada;
    background: #fff;
    overflow: hidden;
    margin-right: 12px;
    .displayArea{
      position: relative;
      margin-top: 30px;
      width: 564px;
      height: 364px;
      overflow-y: auto;
      border-bottom: #f0f0f0 solid 1px;
      .boot-word{
        margin-bottom: 18px;
        .head{
          background: url('./../../assets/images/boot-head.png') no-repeat center center;
          background-size: 80%;
          height: 43px;
          width: 43px;
          float: left;
          margin-left: 24px;
          border-radius: 50%;
          border: 1px solid #ccc;
        }
        .text{
          float: left;
          margin-left: 14px;
        }
        .before{
          position: absolute;
          width: 0;
          height: 0;
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;
          border-right: 6px solid #f1f1f1;
          left: -6px;
          top: 12px;
        }
      }
      .me-word{
        margin-bottom: 18px;
        .head{
          background: url('./../../assets/images/me-head.png') no-repeat center center;
          background-size: 80%;
          height: 44px;
          width: 44px;
          float: right;
          margin-right: 28px;
        }
        .text{
          float: right;
          background: #19b955;
          margin-right: 14px;
        }
        .before{
          position: absolute;
          width: 0;
          height: 0;
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;
          border-left: 6px solid #19b955;
          right: -6px;
          top: 12px;
        }
      }
      .text{
        word-break: break-all;
        top: 4px;
        color: #333;
        font-size: 14px;
        padding: 6px 18px;
        line-height: 24px;
        background: #f1f1f1;
        border-radius: 6px;
        position: relative;
        max-width: 220px;
      }
    }
    .writeArea{
      height: 42px;
      margin-top: 25px;
      .input-text{
        width: 430px;
        height: 38px;
        line-height: 38px;
        float: left;
        margin-left: 14px;
        border: #d0cfcf solid 1px;
        border-radius: 4px;
        text-indent: 14px;
        box-shadow: 1px 1px 2px 0 #d0cfcf;
        font-size: 14px;
        outline: none;
      }
      .send-btn{
        cursor: pointer;
        float: left;
        margin-left: 12px;
        color: #fff;
        font-size: 14px;
        width: 90px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        border-radius: 4px;
        background: #00a3f0;
        outline: none;
        border: none;
      }
    }
  }
}
</style>
