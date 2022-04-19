<template>
  <div>
    <Breadcrumbs />
    <div class="container">
      <h2 class="block" style="padding: 10px">Buyurtmani tasdiqlash</h2>
      <div class="columns">
        <div class="column is-9">
          <div class="box">
            <h3>Yetkazib berish usuli</h3>
            <ul style="display: flex">
              <li class="card card-delivery" :class="{ selectedCard: isCourierDelivery }" @click="selectDeliveryType(1)">
                <span class="icon-motorcycle" style="font-size: 20px; line-height: 2"></span>
                <span>Kurier orqali</span>
              </li>
              <li class="card card-delivery" :class="{ selectedCard: isSelfDelivery }" @click="selectDeliveryType(2)">
                <span class="icon-directions_walk" style="font-size: 20px; line-height: 2"></span>
                <span>O'zi olib ketish</span>
              </li>
            </ul>
          </div>

          <div class="box">
            <h3 style="text-transform: uppercase" class="is-left">
              {{ isCourierDelivery ? 'Yetkazib berish manzili' : 'Buyurtmani olib ketish manzili' }}
            </h3>
            <div><i class="icon-map-pin"></i>&nbsp;{{ orderForm.location.address }}</div>
            <span v-if="isCourierDelivery" class="tag is-warning"
              >Buyurtmani yetkazish manzilini o'zgartirish uchun xaritadan joylashuvni ustiga bosing!</span
            >
            <span v-if="isSelfDelivery" class="tag is-warning"
              >Buyurtmani olib ketish manzilini o'zgartirish uchun xaritadan joylashuvni tanlang!</span
            >
            <div class="columns">
              <div class="column is-two-thirds" style="height: 70vh">
                <yandex-map
                  id="map"
                  style="height: 100%"
                  :settings="settings"
                  zoom="12"
                  search-control-provider="yandex#search"
                  :coords="[latitude, longitude]"
                  :draggable="true"
                  @click="getLocation"
                >
                  <ymap-marker
                    :coords="[latitude, longitude]"
                    :marker-id="10000"
                    :draggable="true"
                    :hint-content="''"
                    :icon="{
                      layout: 'default#image',
                      imageSize: [65, 65],
                      imageHref: '/location.png',
                      imageOffset: [-65, -65]
                    }"
                  />
                </yandex-map>
              </div>
              <div class="column">
                <div v-if="isCourierDelivery" class="field">
                  <label class="label">Manzil</label>
                  <div class="control">
                    <textarea v-model="orderForm.location.address" class="textarea" placeholder="Textarea"></textarea>
                  </div>
                </div>

                <div v-if="isCourierDelivery" class="field">
                  <label class="label">Uy(kvartira) va domofon (agar bor bo'lsa)</label>
                  <div class="control has-icons-right">
                    <input
                      v-model="orderForm.location.house"
                      class="input"
                      :class="{ 'is-danger': !orderForm.location.house }"
                      type="text"
                      placeholder="Kv va domofon"
                    />
                    <span class="icon is-small is-right">
                      <i class="fas fa-exclamation-triangle"></i>
                    </span>
                  </div>
                  <p v-if="!orderForm.location.house" class="help is-danger">Bo'sh bo'lmasligi kerak</p>
                </div>

                <div v-if="isCourierDelivery" class="field">
                  <label class="label">Kurierga xabar qoldirish</label>
                  <div class="control">
                    <textarea v-model="orderForm.order_comment" class="textarea" placeholder="Textarea"></textarea>
                  </div>
                </div>
                <p>O'zingiz olib ketishingiz mumkin bo'lgan restoran manzili.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-3 card" style="height: fit-content">
          <h4 style="padding: 5px">Xisob ma'lumoti</h4>
          <ul>
            <li class="panel-block">
              Maxsulotlarning narxi: <strong>{{ subtotal }}</strong>
            </li>
            <li class="panel-block">
              Restoran xizmati: <strong>{{ restaurantCharge }}</strong>
            </li>
            <li class="panel-block">
              Yetkazib berish: <strong style="text-align: end">{{ deliveryPrice }}</strong>
            </li>
            <li class="panel-block">Umumiy narxi: {{ totalPrice }}</li>
          </ul>
          <div class="is-hidden-mobile" style="margin-top: 20px">
            <button class="button is-info btn-1" @click="submitOrder">Buyurtma qilish</button>
          </div>
        </div>
      </div>
    </div>
    <client-only>
      <LoginForm ref="loginForm" />
    </client-only>
    <portal to="mobile-fixed-footer-menu">
      <nav
        class="navbar is-link is-fixed-bottom is-hidden-tablet"
        role="navigation"
        style="
          background-color: #ffad30;
          text-align: center;
          padding: 13px;
          font-size: 15px;
          font-weight: 700;
          text-transform: uppercase;
          cursor: pointer;
        "
        @click="submitOrder"
      >
        Buyurtma qilish
      </nav>
    </portal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { yandexMap, ymapMarker } from 'vue-yandex-maps'
import Breadcrumbs from '~/components/Breadcrumbs'
import LoginForm from '~/components/LoginForm'
import { getRestaurantById } from '~/http/restaurants'
import { orderCreate } from '~/http/order'
import { getCookieKey } from '~/utils/cookieStore'
export default {
  name: 'Cart',
  components: { LoginForm, Breadcrumbs, yandexMap, ymapMarker },
  data() {
    return {
      settings: {
        appKey: process.env.mapKey,
        lang: getCookieKey('langCode') === 'ru' ? 'ru_RU' : 'uz_UZ',
        version: '2.1'
      },
      orderForm: {
        user: {},
        order: [],
        coupon: null,
        location: {
          lat: '',
          lng: '',
          address: '',
          house: null,
          tag: null
        },
        order_comment: null,
        total: { productQuantity: 1, totalPrice: 42 },
        method: 'COD',
        payment_token: '',
        delivery_type: 1,
        partial_wallet: false,
        dis: 6502.552441254412,
        pending_payment: false,
        tipAmount: null,
        cash_change_amount: '',
        schedule_date: null,
        schedule_slot: null
      },
      restaurantCharge: 0,
      deliveryPrice: 0,
      showModal: false,
      restaurantInfo: {},
      headers: [{ label: 'Name', field: 'name' }]
    }
  },
  computed: {
    ...mapGetters('cart', ['cartItems', 'subtotal']),
    ...mapGetters('setting', ['latitude', 'longitude', 'address', 'house']),
    ...mapGetters('auth', ['getLoggedIn', 'userInfo']),
    isCourierDelivery() {
      return this.orderForm.delivery_type === 1
    },
    isSelfDelivery() {
      return this.orderForm.delivery_type === 2
    },
    totalPrice() {
      return this.subtotal + this.deliveryPrice + this.restaurantCharge
    }
  },
  watch: {
    'orderForm.delivery_type'(value) {
      if (value === 1) {
        this.orderForm.location.address = this.address
        this.orderForm.location.lat = this.latitude
        this.orderForm.location.lng = this.longitude
      }
      if (value === 2) {
        this.orderForm.location.address = this.restaurantInfo.address
        this.orderForm.location.lat = this.restaurantInfo.latitude
        this.orderForm.location.lng = this.restaurantInfo.longitude
      }
    }
  },
  async mounted() {
    await this.$nextTick(() => {
      this.getRestaurantInfo()
      this.orderForm.location.address = this.address
    })
  },
  methods: {
    ...mapActions('setting', ['addCoordinates']),
    async getLocation(e) {
      this.orderForm.location.lat = e.get('coords')[0]
      this.orderForm.location.lon = e.get('coords')[1]
      await this.addCoordinates({ lat: this.orderForm.location.lat, lng: this.orderForm.location.lon })
      this.orderForm.location.address = this.address
    },
    selectDeliveryType(type) {
      this.orderForm.delivery_type = type
    },
    async getRestaurantInfo() {
      if (!this.cartItems.length) return
      const id = await this.cartItems[0].restaurant_id
      console.log(id, 'id')
      const data = { id, latitude: this.latitude, longitude: this.longitude }
      await getRestaurantById(id, data).then((response) => {
        this.restaurantInfo = response.data
        this.restaurantCharge = response.data.restaurant_charges || 0
      })
    },
    async submitOrder() {
      if (!this.getLoggedIn) {
        this.$refs.loginForm.showModal = true
      }
      this.orderForm.location = {
        lat: this.latitude,
        lng: this.longitude,
        address: this.address,
        house: this.house,
        tag: null
      }
      this.orderForm.user = this.userInfo
      this.orderForm.order.push(...this.cartItems)
      await orderCreate(this.orderForm)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.error(error)
        })
    },
    submit() {
      if (!this.getLoggedIn) {
        this.$refs.loginForm.showModal = true
      }
    },
    closeModal() {
      this.showModal = false
    }
  }
}
</script>

<style scoped lang="scss">
.card-delivery {
  display: flex;
  flex-direction: column;
  margin: 5px;
  text-align: center;
  padding: 15px;
  font-size: 15px;
  cursor: pointer;
}
.selectedCard {
  background-color: #ffa00e;
  color: white;
}
</style>
