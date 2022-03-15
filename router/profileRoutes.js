import { load } from './util'

export const profileRoutes = [
  {
    path: '/profile',
    component: load('profile/ProfileInfo'),
    name: 'ProfileInfo'
  },
  {
    path: '/profile/edit-password',
    component: load('profile/EditPassword'),
    name: 'EditPassword'
  },
  {
    path: '/profile/orders',
    component: load('profile/Orders'),
    name: 'Orders'
  }
]
