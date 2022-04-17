<template>
  <div>
    <div class="box">
      <div class="block">
        <h1>{{ info.name }}</h1>
      </div>
      <div class="columns">
        <div><img v-lazy="getImageUrl(info.image, 'x400')" width="200px" height="200px" /></div>
        <div style="display: flex; flex-direction: column; padding-left: 10px">
          <div>O'rtacha narx: {{ info.price_range }} UZS</div>
          <div>Reyting: {{ info.rating }}</div>
          <div>
            {{ info.description }}
          </div>
          <div><i class="icon-map-pin"></i>&nbsp;Manzil: {{ info.address }}</div>
          <div>🕚Yetkazib berish vaqti {{ info.delivery_time }} minut</div>
        </div>
      </div>
    </div>

    <div class="box">
      <form>
        <div class="field">
          <label>Shu restorandagi mahsulotlarni qidirish</label>
          <div class="control has-icons-left has-icons-right">
            <input class="input" type="text" placeholder="Ovqat nomini yozing" />
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="icon-search"></i>
            </span>
          </div>
        </div>
      </form>
      <div v-if="recommended.length" style="padding: 6px">
        <h2>Taklif etilayotganlar</h2>
        <SliderBanner v-if="recommended.length" :items="recommended" />
      </div>

      <div style="padding: 6px">
        <h2 class="block">Ovqatlar</h2>
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
