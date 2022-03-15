<template>
  <div class="block">
    <div class="columns is-left">
      <h3 style="text-transform: uppercase">Taklif qiliniyotgan ovqatlar</h3>
    </div>
    <div class="columns is-multiline">
      <CardItem v-for="(item, index) in 5" :key="index" class="column is-2" />
    </div>
  </div>
</template>

<script>
import CardItem from './CardItem'
export default {
  name: 'FoodItems',
  components: { CardItem }
}
</script>
