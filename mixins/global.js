import Vue from 'vue'

export default async ({ store }) => {
  await Vue.mixin({
    async created() {
      if (process.browser) {
        await store.dispatch('auth/initAuth')
      }
    },
    methods: {
      getImageUrl(path, size, hasCheckFormat) {
        const noImageUrl = 'https://ucarecdn.com/ed57e4e5-c438-49cf-a39d-b4711bf10aea/unnamed.png'

        if (!path) {
          if (size) {
            return process.env.imageOptimizationUrl + `/unsafe/${size}/${noImageUrl}`
          }
          return noImageUrl
        } else {
          const allowedFormat = /^.*\.(JPG|jpg|gif|GIF|jpeg|JPEG|svg|SVG|png|PNG|webp|WEBP)$/.test(path)
          if (!hasCheckFormat && !allowedFormat) {
            if (size) {
              return process.env.imageOptimizationUrl + `/unsafe/${size}/${noImageUrl}`
            } else {
              return noImageUrl
            }
          }

          if (size) {
            return process.env.imageOptimizationUrl + `/unsafe/${size}/${process.env.baseImageUrL}` + path
          } else {
            return process.env.baseImageUrL + path
          }
        }
      }
    }
  })
}
