<template>
  <div class="block">
    <div class="columns is-left">
      <h2 style="text-transform: uppercase; font-weight: 700; font-size: 20px">
        Yaqiningizdagi {{ getRestaurants.length }} dan ortiq restoranlar
      </h2>
    </div>
    <div class="columns is-gapless is-multiline is-mobile">
      <RestaurantItem
        v-for="(item, index) in getRestaurants"
        :key="index"
        class="column is-two-quarter"
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
