<template>
  <div>
    <div class="card">
      <div class="card-image">
        <figure class="image is-4by3">
          <img v-lazy="getImageUrl(food.image)" alt="Placeholder image" />
        </figure>
        <div
          style="
            background-color: rgb(252, 128, 25);
            animation-fill-mode: both;
            animation-duration: 150ms;
            animation-delay: 0ms;
            animation-iteration-count: 1;
            opacity: 1;
            animation-name: react-reveal-582919761327606-1;
          "
        >
          <span v-if="countCartExistFood > 0" class="quantity-badge-recommended">{{ countCartExistFood }}</span>
        </div>
      </div>
      <div class="card-content" style="display: grid; padding: 8px">
        <h5>{{ food.name }}</h5>
        <span class="tag is-primary" style="max-width: fit-content">{{ food.category_name }}</span>
        <span class="food-price">{{ food.price }} UZS</span>
        <div class="content" v-html="food.desc"></div>
      </div>
      <footer class="card-footer">
        <a href="javascript:void(0)" class="card-footer-item">-</a>
        <a href="javascript:void(0)" class="card-footer-item" @click="addToCartFood(food)">+</a>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'FoodCard',
  props: {
    food: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters('cart', ['cartItems']),
    cartExistFood() {
      return this.cartItems.find((el) => el.id === this.food.id)
    },
    countCartExistFood() {
      return this.cartItems.filter((el) => el.id === this.food.id).length
    },
    isExistInCart() {
      return !!this.cartExistFood
    }
  },
  methods: {
    ...mapActions('cart', ['addToCart']),
    addToCartFood(food) {
      this.addToCart(food)
    }
  }
}
</script>

<style scoped>
.quantity-badge-recommended {
  position: absolute;
  top: 0px;
  border-bottom-right-radius: 1rem;
  border-bottom-left-radius: 4px;
  border: 2px solid #fff;
  border-top: 0;
  border-left: 0;
  height: 23px;
  width: 23px;
  font-size: 0.8rem;
  font-weight: 500;
  color: #fff;
  text-align: center;
  background-color: red;
}

.food-price {
  font-size: 13px;
  color: red;
}
</style>
