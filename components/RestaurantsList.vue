<template>
  <div class="block">
    <div class="columns is-left">
      <h2 style="text-transform: uppercase; font-weight: 700; font-size: 20px">
        Yaqiningizdagi {{ getRestaurants.length }} dan ortiq restoranlar
      </h2>
    </div>
    <div class="columns is-multiline">
      <RestaurantItem
        v-for="(item, index) in getRestaurants"
        :key="index"
        class="column is-2"
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
    ...mapGetters('restaurant', ['getRestaurants'])
  },
  async created() {
    await this.fetchRestaurants({ latitude: '40.6976701', longitude: '-74.2598672' })
  },
  methods: {
    ...mapActions('restaurant', ['fetchRestaurants'])
  }
}
</script>
