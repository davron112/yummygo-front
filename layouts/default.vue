<template>
  <div class="container">
    <NavbarMenu />
    <div>
      <nuxt />
    </div>
    <Footer />
    <b-button
      v-if="showBacToTop"
      v-scroll-to="'#body-content'"
      class="tap-top top-cls"
      style="color: #ffffff; border-radius: 50%"
    >
      <i v-ripple class="icon-angle-double-up"></i>
    </b-button>
  </div>
</template>

<script>
import Footer from '~/components/Footer'
import NavbarMenu from '~/components/NavbarMenu'
export default {
  name: 'Default',
  components: { NavbarMenu, Footer },
  data() {
    return {
      showBacToTop: false
    }
  },
  methods: {
    onScroll() {
      // Get the current scroll position
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
      // Here we determine whether we need to show or hide the navbar
      this.showBacToTop = currentScrollPosition > 350
    }
  }
}
</script>
