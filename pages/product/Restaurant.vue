<template>
  <div>
    <div class="box">
      <div class="block">
        <h1>{{ info.name }}</h1>
      </div>
      <div class="columns">
        <div><img v-lazy="getImageUrl(info.image)" width="100px" height="100px" /></div>
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
          <h2 style="margin-bottom: 10px">{{ item.name }}</h2>
          <div class="columns is-multiline">
            <div v-for="(food, indexFood) in item.foods" :key="indexFood" class="column is-2">
              <div class="card">
                <div class="card-image">
                  <figure class="image is-4by3">
                    <img v-lazy="getImageUrl(food.image)" alt="Placeholder image" />
                  </figure>
                </div>
                <div class="card-content">
                  <h5>{{ food.name }}</h5>
                  <span>{{ food.price }} UZS</span>
                  <div class="content" v-html="food.desc"></div>
                  <span class="tag is-primary">{{ food.category_name }}</span>
                </div>
                <footer class="card-footer">
                  <a href="#" class="card-footer-item">-</a>
                  <a href="#" class="card-footer-item">❤️</a>
                  <a href="#" class="card-footer-item">+</a>
                </footer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRestaurantInfo, getRestaurantItems } from '@/http/restaurants'
import SliderBanner from '@/components/SliderBanner'

export default {
  name: 'Restaurant',
  components: { SliderBanner },
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
