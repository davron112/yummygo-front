<!-- Please remove this file from your project -->
<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <img :src="require('@/assets/images/yammi-logo.png')" width="100%" height="88" />
      </a>

      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <div class="navbar-item"><span class="icon-map-pin"></span>&nbsp;Toshkent, Mirzo Ulugbek, Sayram 44</div>
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
            <a class="button is-primary">
              <span class="icon-shopping-bag"></span><span v-if="cartItems.length">{{ cartItems.length }}</span>
            </a>
            <a class="button is-light">
              <span class="icon-user-circle-o"></span>
              &nbsp;Kirish
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'NavbarMenu',
  computed: {
    ...mapGetters('cart', ['cartItems'])
  }
}
</script>
<style>
.navbar-item img {
  max-height: 2.75rem !important;
}
</style>
