<template>
  <div>
    <div class="container">
      <NavbarMenu />
      <nav class="nav has-shadow">
        <div class="container">
          <label for="menu-toggle" class="nav-toggle">
            <span></span>
            <span></span>
            <span></span>
          </label>
          <input id="menu-toggle" type="checkbox" class="is-hidden" />
          <div class="nav-right nav-menu">
            <a class="nav-item is-tab is-hidden-tablet">
              <span class="icon"><i class="fa fa-home"></i></span> Profil
            </a>
            <a class="nav-item is-tab is-hidden-tablet">
              <span class="icon"><i class="fa fa-table"></i></span> Buyurtmalar
            </a>
            <a class="nav-item is-tab is-hidden-tablet">
              <span class="icon"><i class="fa fa-info"></i></span> Hamyon
            </a>

            <a class="nav-item is-tab">
              <span class="icon"><i class="fa fa-sign-out"></i>Chiqish</span>
            </a>
          </div>
        </div>
      </nav>

      <section class="main-content columns is-fullheight">
        <aside class="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile">
          <p class="menu-label is-hidden-touch">Profil</p>
          <ul class="menu-list">
            <li>
              <a href="#" class="is-active">
                <span class="icon"><i class="fa fa-home"></i></span> Profil
              </a>
            </li>
            <li>
              <to-link to="/profile/orders">
                <span class="icon"><i class="fa fa-table"></i></span> Buyurtmalar
              </to-link>
            </li>
            <li>
              <a href="#" class="">
                <span class="icon"><i class="fa fa-info"></i></span> Hamyon
              </a>
            </li>
          </ul>
        </aside>

        <nuxt />
      </section>
    </div>
  </div>
</template>

<script>
import NavbarMenu from '~/components/NavbarMenu'
export default {
  name: 'Cabinet',
  components: { NavbarMenu }
}
</script>

<style scoped lang="scss">
@media screen and (max-width: 768px) {
  #menu-toggle:checked + .nav-menu {
    display: block;
  }
}
</style>
