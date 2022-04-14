<template>
  <div>
    <div class="box">
      <div class="block">
        <h1>{{ info.name }}</h1>
      </div>
      <div class="columns">
        <div><img v-lazy="getImageUrl(info.image, 'x150')" width="100px" height="100px" /></div>
        <div>O'rtacha narx: {{ info.price_range }} UZS</div>
        <div>Reyting: {{ info.rating }}</div>
        <div>
          {{ info.description }}
        </div>
        <div>Adress: {{ info.address }}</div>
        <div>🕚Yetkazib berish vaqti {{ info.delivery_time }} minut</div>
      </div>
    </div>

    <div>
      <div>
        <form class="box">
          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <input class="input" type="email" placeholder="Email" />
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
              <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
              </span>
            </p>
          </div>
        </form>
      </div>
      <div v-if="recommended.length">
        <h2>Recommended</h2>
        <SliderBanner v-if="recommended.length" :items="recommended" />
      </div>

      <div>
        <h2 class="block">Foods</h2>
        <div v-for="(item, index) in items" :key="index">
          <FoodItems :item="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRestaurantInfo, getRestaurantItems } from '@/http/restaurants'
import SliderBanner from '@/components/SliderBanner'
import FoodItems from '@/pages/product/FoodItems'

export default {
  name: 'Restaurant',
  components: { FoodItems, SliderBanner },
  data() {
    return {
      info: {},
      items: [],
      recommended: []
    }
  },
  created() {
    this.loadItems()
    this.loadInfoRestaurant()
  },
  methods: {
    async loadItems() {
      await getRestaurantItems(this.$route.params.slug).then((response) => {
        const { items, recommended } = response.data
        this.items = items
        this.recommended = recommended
      })
    },
    async loadInfoRestaurant() {
      await getRestaurantInfo(this.$route.params.slug).then((response) => {
        this.info = response.data
      })
    }
  }
}
</script>

<style scoped></style>
