<template>
  <div>
    <Breadcrumbs />
    <div class="container">
      <h2 class="block" style="padding: 10px">
        Savatchadagi maxsulotlar <small>{{ cartItems.length }} ta</small>
      </h2>
      <div class="columns">
        <ul class="responsive-table column is-9">
          <li class="table-header">
            <div class="col col-3">Nomi</div>
            <div class="col col-4">Batafsil</div>
            <div class="col col-2">Soni</div>
            <div class="col col-3">Narxi</div>
          </li>
          <li v-for="(item, index) in cartItems" :key="index" class="table-row">
            <div class="col col-3" data-label="Nomi:">
              <h3>{{ item.name }}</h3>
            </div>
            <div class="col col-4" data-label="Batafsil:">
              <span v-html="item.desc"></span>
              <span class="tag is-primary" style="max-width: fit-content">{{ item.category_name }}</span>
            </div>
            <div class="col col-2" data-label="Soni:">{{ item.quantity }}</div>
            <div class="col col-2" data-label="Narxi:">{{ item.price }}</div>
          </li>
        </ul>
        <div class="column is-3 card">
          <ul>
            <li>
              Maxsulotlarning narxi: <strong>{{ subtotal }}</strong>
            </li>
          </ul>
          <div style="margin-top: 20px">
            <button class="button is-success is-light" @click="submit">Buyurtma qilish</button>
          </div>
        </div>
      </div>
    </div>
    <client-only>
      <LoginForm ref="loginForm" />
    </client-only>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumbs from '~/components/Breadcrumbs'
import LoginForm from '~/components/LoginForm'
export default {
  name: 'Cart',
  components: { LoginForm, Breadcrumbs },
  computed: {
    ...mapGetters('cart', ['cartItems', 'subtotal']),
    ...mapGetters('auth', ['getLoggedIn'])
  },
  data() {
    return {
      showModal: false,
      headers: [{ label: 'Name', field: 'name' }]
    }
  },
  methods: {
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
