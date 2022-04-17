<template>
  <div class="container column is-10">
    <div class="section">
      <div v-for="(order, index) in orders" :key="index" class="card" style="margin-top: 20px">
        <div class="card-header">
          <p class="card-header-title">Buyurtma raqami #{{ order.id }}</p>
        </div>
        <div class="card-content">
          <div class="panel-block">{{ order.name }}</div>
          <ul>
            <li v-for="(item, indexGood) in order.orderitems" :key="indexGood" style="display: flex" class="panel-block">
              <div class="button is-small">x{{ item.quantity }}</div>
              <div style="padding: 4px">{{ item.name }}</div>
            </li>
          </ul>
        </div>
        <hr />
        <ul>
          <li class="panel-block">Yetkazish narxi:&nbsp;{{ order.delivery_charge || 0 }}</li>
          <li class="panel-block">Umumiy narxi:&nbsp;{{ order.total }}</li>
          <li class="panel-block">To'lov turi:&nbsp;{{ order.payment_mode }}</li>
          <div class="panel-block">Yetkazish manzili:&nbsp;{{ order.address }}</div>
        </ul>
      </div>
      <br />
      <br />
    </div>
  </div>
</template>

<script>
import { getOrders } from '~/http/order'

export default {
  name: 'Orders',
  layout: 'cabinet',
  data() {
    return {
      orders: []
    }
  },
  created() {
    this.loadOrders()
  },
  methods: {
    async loadOrders() {
      await getOrders().then((response) => {
        this.orders = response.data
      })
    }
  }
}
</script>

<style scoped></style>
