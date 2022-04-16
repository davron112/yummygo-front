<template>
  <nuxt-link :to="'/product/restaurant/' + item.slug" style="padding: 20px">
    <div class="card">
      <div class="card-image">
        <figure class="image is-4by3">
          <img v-lazy="getImageUrl(item.image, 'x400')" :alt="item.name" />
        </figure>
      </div>
      <div class="card-content">
        <div class="title" style="font-size: 16px">
          {{ item.name }}
        </div>
        <div class="content" style="font-size: 12px">
          {{ item.description }}
          <br />
          <time datetime="2016-1-1"><span class="icon-clock"></span>&nbsp; 15 min</time>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name: 'RestaurantItem',
  props: {
    item: {
      type: Object,
      required: false,
      default() {
        return {}
      }
    }
  }
}
</script>
