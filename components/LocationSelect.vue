<template>
  <Modal v-if="showModal" @close="closeModal">
    <div class="columns">
      <div class="column" style="height: 50vh">
        <yandex-map id="map" :settings="settings" zoom="10" :coords="[latitude, longitude]" @click="getLocation">
          <ymap-marker
            style="height: 100%"
            :coords="[latitude, longitude]"
            :marker-id="10000"
            :hint-content="''"
            :icon="{
              layout: 'default#image',
              imageSize: [35, 65],
              imageHref: '/location.png',
              imageOffset: [-35, -65]
            }"
            @click="getLocation"
          />
        </yandex-map>
      </div>
    </div>
  </Modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { yandexMap, ymapMarker } from 'vue-yandex-maps'
import { getCookieKey } from '~/utils/cookieStore'

export default {
  name: 'LocationSelect',
  components: {
    yandexMap,
    ymapMarker
  },
  data() {
    return {
      showModal: false,
      settings: {
        appKey: process.env.mapKey,
        lang: getCookieKey('langCode') === 'ru' ? 'ru_RU' : 'uz_UZ',
        version: '2.1'
      }
    }
  },
  computed: {
    ...mapGetters('setting', ['address', 'latitude', 'longitude']),
    ...mapGetters('auth', ['getLoggedIn'])
  },
  methods: {
    ...mapActions('auth', ['loginData']),
    ...mapActions('setting', ['addCoordinates']),
    async getLocation(e) {
      const lat = e.get('coords')[0]
      const lng = e.get('coords')[1]
      await this.addCoordinates({ lat, lng })
    },
    closeModal() {
      this.showModal = false
    }
  }
}
</script>

<style scoped></style>
