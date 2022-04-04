<template>
  <div class="home-slider" style="margin-top: 20px">
    <div v-if="items && items.length" v-swiper:mySwiperSlider="swiperOption">
      <div class="swiper-wrapper">
        <div v-for="(item, index) in items" :key="index" class="swiper-slide">
          <a href="javascript:void(0)">
            <div class="home-slider__banner-img">
              <img
                loading="lazy"
                :data-srcset="getImageUrl(item.image)"
                class="home-slider__desktop-img swiper-lazy"
                width="100%"
                style="aspect-ratio: 1 / 1"
                height="100%"
              />
              <div class="swiper-lazy-preloader"></div>
            </div>
          </a>
        </div>
      </div>
      <div slot="button-prev" class="swiper-button-prev"></div>
      <div slot="button-next" class="swiper-button-next"></div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'SliderBanner',
  props: {
    items: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 5,
        spaceBetween: 10,
        /*
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        },
        */
        autoplay: false,
        preloadImages: true,
        lazy: true,
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.home-slider {
  &__mobile-img {
    display: none;
  }
  &__pagination {
    text-align: center;
  }
  &__banner-img {
    height: 100%;
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      border-radius: 16px;
      /*background: #000000;*/
      opacity: 0.04;
    }
    img {
      border-radius: 16px;
      -webkit-transition: -webkit-filter 0.3s linear 0s;
      transition: -webkit-filter 0.3s linear 0s;
      transition: filter 0.3s linear 0s;
      transition: filter 0.3s linear 0s, -webkit-filter 0.3s linear 0s;
      max-width: 100%;
      height: 100%;
      top: 0;
    }
  }
}
@media (max-width: 720px) {
  .home-slider {
    &__pagination {
      text-align: center;
    }
  }
  .img-desktop {
    display: none;
  }
}
</style>
