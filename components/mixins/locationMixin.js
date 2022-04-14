import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('setting', ['addCoordinates']),
    async loadLocation() {
      if (!process.browser) return
      try {
        const coordinates = await this.$getLocation({
          enableHighAccuracy: true
        })
        await this.addCoordinates(coordinates)
      } catch (e) {
        console.error(e)
      }
    }
  }
}
