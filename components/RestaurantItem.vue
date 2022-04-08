<template>
  <nuxt-link :to="'/product/restaurant/' + item.slug" style="padding: 20px">
    <div class="card">
      <div class="card-image">
        <figure class="image is-4by3">
          <img v-lazy="getImageUrl(item.image)" :alt="item.name" />
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img v-lazy="getImageUrl(item.image)" alt="Placeholder image" />
            </figure>
          </div>
          <div class="media-content">
            <p class="title" style="font-size: 16px">{{ item.name }}</p>
          </div>
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
