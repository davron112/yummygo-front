<template>
  <div class="block">
    <div class="columns is-left">
      <h3 style="text-transform: uppercase">Yaqiningizdagi 20 dan ortiq restoranlar</h3>
    </div>
    <div class="columns is-multiline">
      <RestaurantItem class="column is-2" v-for="(item, index) in 12" :key="index" style="padding: 8px"/>
    </div>
  </div>
</template>

<script>
import RestaurantItem from "./RestaurantItem";
export default {
  name: "RestaurantsList",
  components: {RestaurantItem}
}
</script>
