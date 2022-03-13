<template>
  <div class="home-slider block">
    <div v-if="getSliderItems && getSliderItems.length" v-swiper:mySwiperSlider="swiperOption">
      <div class="swiper-wrapper">
        <div v-for="(item, index) in getSliderItems" :key="index" class="swiper-slide">
          <a :href="item.url">
            <div class="home-slider__banner-img">
              <img
                loading="lazy"
                :data-srcset="item.image"
                class="home-slider__desktop-img swiper-lazy"
                width="100%"
                style="aspect-ratio: 1 / 1; border-radius: 50%"
                height="100%"
              />
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
  data() {
    return {
      getSliderItems: [
        {
          url: '/',
          image: 'https://demo.foodomaa.com/assets/img/slider/1566646245o1m4bOO6vi.png'
        },
        {
          url: '/',
          image: 'https://demo.foodomaa.com/assets/img/slider/156664628890XKDEjOhq.png'
        },
        {
          url: '/',
          image: 'https://demo.foodomaa.com/assets/img/slider/1566646099fzDvDqnOuP.png'
        },
        {
          url: '/',
          image: 'https://demo.foodomaa.com/assets/img/slider/1566646245o1m4bOO6vi.png'
        },
        {
          url: '/',
          image: 'https://demo.foodomaa.com/assets/img/slider/1566646245o1m4bOO6vi.png'
        },
        {
          url: '/',
          image: 'https://demo.foodomaa.com/assets/img/slider/1566646245o1m4bOO6vi.png'
        },
        {
          url: '/',
          image: 'https://demo.foodomaa.com/assets/img/slider/1566646245o1m4bOO6vi.png'
        },
        {
          url: '/',
          image: 'https://demo.foodomaa.com/assets/img/slider/1566646245o1m4bOO6vi.png'
        },
        {
          url: '/',
          image: 'https://demo.foodomaa.com/assets/img/slider/1566646245o1m4bOO6vi.png'
        }
      ],
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
      },
      items: []
    }
  }
}
</script>
<style lang="scss" scoped>
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
