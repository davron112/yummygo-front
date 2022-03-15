<template>
  <div>
    <SliderBanner />
    <TabDelivery />
    <SliderFoods />
    <RestaurantsList />
    <!--<FoodItems />
    <FoodItems />
    <FoodItems />-->
  </div>
</template>

<script>
import TabDelivery from '@/components/TabDelivery'
import SliderBanner from '@/components/SliderBanner'
import SliderFoods from '@/components/SliderFoods'
import RestaurantsList from '@/components/RestaurantsList'
export default {
  name: 'IndexPage',
  layout: 'default',
  components: { RestaurantsList, SliderFoods, SliderBanner, TabDelivery }
}
</script>
