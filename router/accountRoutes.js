import { load } from './util'

export const accountRoutes = [
  {
    path: '/account/login',
    component: load('account/login'),
    name: 'Login',
    meta: {
      slug: 'Login'
    }
  },
  {
    path: '/account/register',
    component: load('account/register'),
    name: 'Register',
    meta: {
      slug: 'Register'
    }
  },
  {
    path: '/account/forget-password',
    component: load('account/forget-password'),
    name: 'ForgetPassword',
    meta: {
      slug: 'ForgetPassword'
    }
  }
]
