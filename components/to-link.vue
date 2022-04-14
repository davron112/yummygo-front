<template>
  <nuxt-link :to="locale ? localePath({ path: to }) : to" :event="loading ? '' : 'click'" :class="classNames">
    <slot></slot>
  </nuxt-link>
</template>

<script>
export default {
  name: 'ToLink',
  props: {
    to: {
      type: [String, Number],
      default: ''
    },
    classNames: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    locale: {
      type: Boolean,
      default: true
    }
  }
}
</script>
