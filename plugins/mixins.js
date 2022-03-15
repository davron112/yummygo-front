import Vue from 'vue'

export default async () => {
  await Vue.mixin({
    methods: {
      getImageUrl(path, size, hasCheckFormat) {
        const noImageUrl = 'https://ucarecdn.com/8d072f1a-cf1e-4c98-9c67-50cb1b7cdb56/unnamed.jpg'

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
            return process.env.imageOptimizationUrl + `/unsafe/${size}/${process.env.IMAGE_BASE_URL}` + path
          } else {
            return process.env.IMAGE_BASE_URL + path
          }
        }
      },
      moneyFormat(number, decimals, decPoint, thousandsSep) {
        // Strip all characters but numerical ones.
        number = (number + '').replace(/[^0-9+\-Ee.]/g, '')
        number = number / 100
        const n = !isFinite(+number) ? 0 : +number
        const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
        const sep = typeof thousandsSep === 'undefined' ? ',' : thousandsSep
        const dec = typeof decPoint === 'undefined' ? '.' : decPoint
        let s = ''
        const toFixedFix = function (n, prec) {
          const k = Math.pow(10, prec)
          return '' + Math.round(n * k) / k
        }
        // Fix for IE parseFloat(0.55).toFixed(0) = 0;
        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
        if (s[0].length > 3) {
          s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
        }
        if ((s[1] || '').length < prec) {
          s[1] = s[1] || ''
          s[1] += new Array(prec - s[1].length + 1).join('0')
        }
        return s.join(dec)
      }
    }
  })
}
