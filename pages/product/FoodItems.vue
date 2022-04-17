<template>
  <div style="margin-top: 20px">
    <h2 style="margin-bottom: 10px">{{ item.name }}</h2>
    <div class="columns is-multiline">
      <div v-for="(food, indexFood) in item.foods" :key="indexFood" class="column is-2">
        <FoodCard :food="food" />
      </div>
    </div>
  </div>
</template>

<script>
import FoodCard from '~/pages/product/FoodCard'

export default {
  name: 'FoodItems',
  components: { FoodCard },
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped></style>
