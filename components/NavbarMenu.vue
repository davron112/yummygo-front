<!-- Please remove this file from your project -->
<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <img :src="require('@/assets/images/yammi-logo.png')" width="130" height="100" />
      </a>

      <div
        class="navbar-burger"
        style="cursor: pointer; width: 100%; font-size: small; padding: 7px; text-align: right"
        @click="openLocationPopup"
      >
        <i class="icon-map-pin"></i>&nbsp;{{ address }}
      </div>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <div class="navbar-item" style="cursor: pointer" @click="openLocationPopup">
          <span class="icon-map-pin"></span>&nbsp;<span style="font-size: small">{{ address }}</span>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item" style="width: 100%">
          <div class="control has-icons-right" style="width: 100%">
            <input class="input" type="text" placeholder="Restoran yoki ovqat nomini kiriting" />
            <span class="icon is-small is-right">
              <i class="icon-search"></i>
            </span>
          </div>
        </div>
        <div class="navbar-item">
          <div class="buttons">
            <to-link to="/alerts" class="button is-primary"> <span class="icon-notifications"></span>3 </to-link>
            <to-link to="/shop/cart" class="button is-primary">
              <span class="icon-shopping-bag"></span><span v-if="cartItems.length">{{ cartItems.length }}</span>
            </to-link>
            <a class="button is-light" href="javascript:void(0)" @click="openProfile">
              <span class="icon-user-circle-o"></span>
              &nbsp;
              <span v-if="getLoggedIn">Profil</span>
              <span v-else>Kirish</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <client-only>
      <LoginForm ref="loginForm" />
      <LocationSelect ref="locationSelect" />
    </client-only>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import LoginForm from '~/components/LoginForm'
import LocationSelect from '~/components/LocationSelect'
export default {
  name: 'NavbarMenu',
  components: { LocationSelect, LoginForm },
  computed: {
    ...mapGetters('auth', ['getLoggedIn']),
    ...mapGetters('setting', ['address']),
    ...mapGetters('cart', ['cartItems'])
  },
  methods: {
    openProfile() {
      if (!this.getLoggedIn) {
        this.$refs.loginForm.showModal = true
      } else {
        this.$router.push('/profile')
      }
    },
    openLocationPopup() {
      this.$refs.locationSelect.showModal = true
    }
  }
}
</script>
<style>
.navbar-item img {
  max-height: 2.75rem !important;
}
</style>
