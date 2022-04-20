import { load } from './util'

export const shopRoutes = [
  {
    path: '/shop/cart',
    component: load('shop/Cart'),
    name: 'Cart'
  },
  {
    path: '/shop/checkout',
    component: load('shop/Checkout'),
    name: 'Checkout'
  },
  {
    path: '/shop/order-success/:id',
    component: load('shop/OrderSuccess'),
    name: 'OrderSuccess'
  }
]
