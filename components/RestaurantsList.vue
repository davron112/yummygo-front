<template>
  <div class="block">
    <div style="padding: 4px">
      <h2 style="text-transform: uppercase; font-weight: 700; font-size: 20px">Yaqiningizdagi restoranlar</h2>
      <span style="font-size: small">{{ getRestaurants.length }} ta restoran</span>
    </div>
    <div class="columns is-gapless is-multiline is-mobile">
      <RestaurantItem
        v-for="(item, index) in getRestaurants"
        :key="index"
        class="product-box"
        :item="item"
        style="padding: 8px"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import RestaurantItem from './RestaurantItem'
export default {
  name: 'RestaurantsList',
  components: { RestaurantItem },
  data() {
    return {
      restaurants: []
    }
  },
  computed: {
    ...mapGetters('setting', ['latitude', 'longitude']),
    ...mapGetters('restaurant', ['getRestaurants'])
  },
  async created() {
    await this.fetchRestaurants({ latitude: this.latitude, longitude: this.longitude })
  },
  methods: {
    ...mapActions('restaurant', ['fetchRestaurants'])
  }
}
</script>
