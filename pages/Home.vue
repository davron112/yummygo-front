<template>
  <div>
    <SliderBanner v-if="getSliderItems.length" :items="getSliderItems" />
    <TabDelivery />
    <SliderFoods v-if="getRecommendItems.length" :items="getRecommendItems" />
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
import { getPromoSlides, getRestaurantSlides } from '@/http/restaurants'
export default {
  name: 'IndexPage',
  layout: 'default',
  components: { RestaurantsList, SliderFoods, SliderBanner, TabDelivery },
  data() {
    return {
      getSliderItems: [],
      getRecommendItems: []
    }
  },
  created() {
    this.loadData()
    this.loadDataRecommend()
  },
  methods: {
    async loadData() {
      await getPromoSlides().then((res) => {
        this.getSliderItems = res.data.mainSlides
      })
    },
    async loadDataRecommend() {
      await getRestaurantSlides().then((res) => {
        this.getRecommendItems = res.data
      })
    }
  }
}
</script>
