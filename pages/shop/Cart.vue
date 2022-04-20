<template>
  <div>
    <Breadcrumbs />
    <div class="container">
      <h2 class="block" style="padding: 10px">
        Savatchadagi maxsulotlar <small>{{ cartItems.length }} ta</small>
      </h2>
      <div v-if="cartItems.length" class="columns">
        <ul class="responsive-table column is-9">
          <li class="table-header">
            <div class="col col-2"></div>
            <div class="col col-2">Mahsulot</div>
            <div class="col col-4">Batafsil</div>
            <div class="col col-2">Soni</div>
            <div class="col col-3">Narxi</div>
          </li>
          <li v-for="(item, index) in cartItems" :key="index" class="table-row">
            <div class="col col-2" data-label="">
              <img :src="getImageUrl(item.image, 'x300')" width="100" height="100" style="border-radius: 16px" />
            </div>

            <div class="col col-2" data-label="Nomi:">
              <span>{{ item.name }}</span>
            </div>
            <div class="col col-4" data-label="Batafsil:">
              <span v-html="item.desc"></span>
              <span class="tag is-primary" style="max-width: fit-content">{{ item.category_name }}</span>
            </div>
            <div class="col col-2" data-label="Soni:">{{ item.quantity }}</div>
            <div class="col col-2" data-label="Narxi:">{{ item.price }}</div>
          </li>
        </ul>
        <div class="column is-3 card" style="height: fit-content">
          <h4 style="padding: 5px">Xisob ma'lumoti</h4>
          <ul>
            <li class="panel-block">
              Maxsulotlarning narxi: <strong>{{ subtotal }}</strong>
            </li>
            <li class="panel-block">
              Restoran xizmati: <strong>{{ restaurantCharge }}</strong>
            </li>
            <li class="panel-block">Umumiy narxi: {{ totalPrice }}</li>
          </ul>
          <div class="is-hidden-mobile" style="margin-top: 20px">
            <button class="button is-info btn-1" @click="submitOrder">Buyurtmani rasmiylashtirsh</button>
          </div>
        </div>
      </div>
      <div v-else style="text-align: center">
        <img height="200" width="200" :src="require('assets/images/empty-cart.png')" />
      </div>
      <div style="text-align: center">
        <span>Sizning savatchangiz bo'sh</span>
        <div>
          <button class="button">Menularni ko'rish</button>
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
import { mapGetters } from 'vuex'
import Breadcrumbs from '~/components/Breadcrumbs'
import LoginForm from '~/components/LoginForm'
import { getRestaurantById } from '~/http/restaurants'
export default {
  name: 'Cart',
  components: { LoginForm, Breadcrumbs },
  data() {
    return {
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
    totalPrice() {
      return this.subtotal + this.deliveryPrice + this.restaurantCharge
    }
  },
  async mounted() {
    await this.$nextTick(() => {
      this.getRestaurantInfo()
    })
  },
  methods: {
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
      await this.$router.push('/shop/checkout')
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
.responsive-table {
  li {
    border-radius: 3px;
    padding: 25px 30px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
  }
  .table-header {
    background-color: #f0f1f1;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }
  .table-row {
    background-color: #ffffff;
    box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
  }
  .col-1 {
    flex-basis: 10%;
  }
  .col-2 {
    flex-basis: 40%;
  }
  .col-3 {
    flex-basis: 25%;
  }
  .col-4 {
    flex-basis: 25%;
  }

  @media all and (max-width: 767px) {
    .table-header {
      display: none;
    }
    .table-row {
    }
    li {
      display: block;
    }
    .col {
      flex-basis: 100%;
    }
    .col {
      display: flex;
      padding: 10px 0;
      &:before {
        color: #6c7a89;
        padding-right: 10px;
        content: attr(data-label);
        flex-basis: 50%;
        text-align: right;
      }
    }
  }
}
</style>
