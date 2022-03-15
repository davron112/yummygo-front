<template>
  <div>Error</div>
</template>
<script>
export default {
  name: 'Error',
  fetch() {
    if (process.server) {
      this.$nuxt.context.res.statusCode = 404
    }
    // use throw new Error()
    throw new Error('Post not found')
  }
}
</script>
