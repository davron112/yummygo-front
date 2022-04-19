<template>
  <Modal v-if="showModal" @close="closeModal">
    <div class="columns">
      <div class="column">
        <yandex-map id="map" :settings="settings" zoom="10" :coords="[latitude, longitude]" @click="getLocation">
          <ymap-marker
            :coords="[latitude, longitude]"
            :marker-id="10000"
            :hint-content="''"
            :icon="{
              layout: 'default#image',
              imageSize: [35, 65],
              imageHref: '/location.png',
              imageOffset: [-35, -65]
            }"
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
    closeModal() {
      this.showModal = false
    },
    getLocation(data) {
      console.log(data)
    }
  }
}
</script>

<style scoped></style>
