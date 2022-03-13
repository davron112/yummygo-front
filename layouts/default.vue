<template>
  <div class="container">
    <NavbarMenu />
    <div>
      <nuxt />
    </div>
    <FooterSection />
  </div>
</template>

<script>
import FooterSection from "~/components/Footer";
import NavbarMenu from "~/components/NavbarMenu";
export default {
name: "default",
  components: {NavbarMenu, FooterSection}
}
</script>
