import { load } from './util'

export const commonRoutes = [
  {
    path: '/',
    component: load('Home'),
    name: 'Home',
    meta: {
      slug: 'home'
    }
  },
  {
    path: '/page/:slug',
    component: load('Page'),
    name: 'page'
  },
  {
    path: '/alerts',
    component: load('Alert'),
    name: 'page'
  },

  {
    path: '*',
    component: load('Error'),
    name: 'not_found',
    meta: {
      slug: 'NotFound',
      notChangePath: true
    }
  }
]
