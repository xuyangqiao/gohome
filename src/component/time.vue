<template>
  <div class="timer">
    <p class="hours-wrap">
      <span class="hours">{{hourAndMinute}}</span>
    </p>
    <p class="date">{{date}}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      hourAndMinute: '',
      date: ''
    }
  },
  created () {
    this.getTime()
  },
  methods: {
    getTime () {
      let date = new Date()
      let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      let minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      this.hourAndMinute = `${hour}:${minute}`
      this.date = date.toDateString()
      setTimeout(() => {
        this.getTime()
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.timer{
  margin-bottom: 30px;
  .hours-wrap{
    margin-bottom: 5px;
    .hours{
      font-size: 70px;
      font-weight: lighter;
      line-height: 75px;
      z-index: 2;
      color: #fff;
    }
  }
  .date{
    font-size: 18px;
    line-height: 24px;
    font-weight: 400;
    color: #fff;
    letter-spacing: 1px;
  }
}
</style>
