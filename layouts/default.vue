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
    <portal-target name="mobile-fixed-footer-menu">
      <nav class="navbar is-link is-fixed-bottom is-hidden-tablet" role="navigation" style="background-color: #ffad30">
        <div class="navbar-brand">
          <to-link to="/" class="navbar-item is-expanded is-block has-text-centered">
            <i class="icon-map-pin"></i>
            <p class="is-size-7">Eng yaqini</p>
          </to-link>
          <to-link to="/alerts" class="navbar-item is-expanded is-block has-text-centered">
            <i class="icon-notifications"></i>
            <p class="is-size-7">Xabarlar</p>
          </to-link>
          <a href="javascript:void(0)" class="navbar-item is-expanded is-block has-text-centered">
            <i class="icon-search"></i>
            <p class="is-size-7">Izlash</p>
          </a>
          <to-link to="/shop/cart" class="navbar-item is-expanded is-block has-text-centered">
            <i class="icon-shopping-bag"></i>
            <p class="is-size-7">Savatcha</p>
          </to-link>
          <to-link to="/profile" class="navbar-item is-expanded is-block has-text-centered">
            <i class="icon-user-circle-o"></i>
            <p class="is-size-7">Profil</p>
          </to-link>
        </div>
      </nav>
    </portal-target>
  </div>
</template>

<script>
import Footer from '@/components/Footer'
import { mapActions } from 'vuex'
import NavbarMenu from '@/components/NavbarMenu'
import locationMixin from '@/components/mixins/locationMixin'

export default {
  name: 'Default',
  components: { NavbarMenu, Footer },
  mixins: [locationMixin],
  data() {
    return {
      showBacToTop: false
    }
  },
  async mounted() {
    await this.$nextTick(() => {
      this.loadLocation()
    })
    await this.$nextTick(() => {
      this.loadUserInfo()
    })
  },
  methods: {
    ...mapActions('auth', ['loadUserInfo']),
    onScroll() {
      // Get the current scroll position
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
      // Here we determine whether we need to show or hide the navbar
      this.showBacToTop = currentScrollPosition > 350
    }
  }
}
</script>
<style lang="scss" scoped>
.navbar-item {
  width: 20% !important;
  padding: 2px !important;
}
</style>
