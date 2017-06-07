<template>
  <div class="music-page">
    <swiper class="banner-swiper" :options="swiperOption">
      <swiper-slide v-for="slide in swiperSlides">I'm Slide {{ slide }}</swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
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
        observeParents: true
      },
      swiperSlides: [1, 2, 3, 4, 5]
    }
  },
  mounted () {
    let swiperSlides = this.swiperSlides
    if (swiperSlides.length < 10) swiperSlides.push(swiperSlides.length + 1)
  }
}
</script>

<style lang="scss">
.music-page {
  .banner-swiper {
    height: 150px;
    background: #fff;
  }
}
</style>
