<template>
  <div class="home-slider block">
    <div v-if="items.length" v-swiper:mySwiperSlider="swiperOption">
      <div class="swiper-wrapper">
        <div v-for="(item, index) in items" :key="index" class="swiper-slide">
          <a href="javascript:void(0)">
            <div class="home-slider__banner-img">
              <img
                loading="lazy"
                :data-srcset="getImageUrl(item.image, 'x200')"
                class="home-slider__desktop-img swiper-lazy"
                width="100%"
                style="aspect-ratio: 1 / 1; border-radius: 50%"
                height="100%"
              />
              <span class="category-slider-name">{{ item.name }}</span>
              <div class="swiper-lazy-preloader"></div>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div class="home-slider__pagination">
      <div slot="pagination" class="swiper-pagination" style="position: relative; height: 20px" />
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'SliderFoods',
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
        slidesPerView: 12,
        spaceBetween: 10,
        breakpoints: {
          1199: {
            slidesPerView: 12,
            spaceBetween: 10
          },
          991: {
            slidesPerView: 8,
            spaceBetween: 5
          },
          420: {
            slidesPerView: 4,
            spaceBetween: 3
          }
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        },
        autoplay: true,
        preloadImages: true,
        lazy: true,
        loop: true
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.category-slider-name {
  position: absolute;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  color: white;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 3px;
  font-weight: 500;
  font-size: 0.7rem;
  left: 50%;
  top: 100%;
  text-align: center;
  padding: 0 5px;
  min-height: 48px;
  line-height: 1;
}
.swiper-pagination-clickable .swiper-pagination-bullet {
  margin-right: 4px !important;
}
.home-slider {
  &__mobile-img {
    display: block;
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
