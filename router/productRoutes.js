import { load } from './util'

export const productRoutes = [
  {
    path: '/product/search',
    component: load('product/Search'),
    name: 'Search'
  },
  {
    path: '/product/category/:slug?',
    component: load('product/FoodsList'),
    name: 'FoodsList'
  },
  {
    path: '/product/food/:slug?',
    component: load('product/Food'),
    name: 'Food'
  },
  {
    path: '/product/restaurant/:slug?',
    component: load('product/Restaurant'),
    name: 'Restaurant'
  }
]
