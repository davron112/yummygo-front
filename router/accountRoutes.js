import { load } from './util'

export const accountRoutes = [
  {
    path: '/login',
    component: load('account/login'),
    name: 'Login',
    meta: {
      slug: 'Login'
    }
  },
  {
    path: '/register',
    component: load('account/register'),
    name: 'Register',
    meta: {
      slug: 'Register'
    }
  },
  {
    path: '/forget-password',
    component: load('account/forget-password'),
    name: 'ForgetPassword',
    meta: {
      slug: 'ForgetPassword'
    }
  }
]
