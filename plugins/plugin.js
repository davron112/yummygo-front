import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper/dist/ssr'
import VueLazyLoad from 'vue-lazyload'
import VueScrollTo from 'vue-scrollto'
import VueGeolocation from 'vue-browser-geolocation'
import VueScreen from 'vue-screen'
import VueClipboard from 'vue-clipboard2'
import Ripple from 'vue-ripple-directive'
import { ObserveVisibility } from 'vue-observe-visibility'
import VuePhotoSwipe from 'vue-photoswipe'

Vue.use(VuePhotoSwipe)
Vue.directive('observe-visibility', ObserveVisibility)
Ripple.color = 'rgba(0, 178, 169, 0.35)'
Vue.directive('ripple', Ripple)
Vue.use(VueClipboard)
Vue.use(VueAwesomeSwiper)
Vue.use(VueLazyLoad)
Vue.use(VueScrollTo)
Vue.use(VueGeolocation)
Vue.use(
  VueScreen,
  {
    xs: 0,
    sm: 576,
    md: 768,
    sliderMobile: 720,
    lg: 1024,
    xl: 1200,
    mobile: (screen) => !screen.lg && !screen.xl && (screen.md || screen.sm || screen.xs)
  },
  'bootstrap'
)
