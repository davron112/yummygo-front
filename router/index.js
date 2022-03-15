import Vue from 'vue'
import Router from 'vue-router'
import { load } from '@/router/util'
import { commonRoutes } from './commonRoutes'
import { shopRoutes } from './shopRoutes'
import { accountRoutes } from './accountRoutes'
import { productRoutes } from './productRoutes'
import { profileRoutes } from './profileRoutes'

Vue.use(Router)

export function createRouter() {
  function changeChildrenRoute(routes, lang) {
    const newRoutes = []
    if (routes.length) {
      routes.forEach((item) => {
        if (item.meta && item.meta.notChangePath) {
          const nameRoute = item.name ? `${item.name}___${lang}` : undefined
          newRoutes.push({
            name: nameRoute,
            path: item.path,
            component: item.component,
            meta: item.meta,
            children: item.children && item.children.length ? item.children : []
          })
        } else if (lang === 'ru') {
          const nameRoute = item.name ? `${item.name}___${lang}` : undefined
          newRoutes.push({
            name: nameRoute,
            path: item.path,
            component: item.component,
            meta: item.meta,
            children: item.children && item.children.length ? item.children : []
          })
        } else {
          const nameRoute = item.name ? `${item.name}___${lang}` : undefined
          newRoutes.push({
            name: nameRoute,
            path: item.path,
            component: item.component,
            meta: item.meta,
            children: item.children && item.children.length ? item.children : []
          })
        }
      })
    }
    return newRoutes
  }

  function addLocalesToRoutes(routes) {
    const newRoutes = []
    const locales = ['uz', 'ru']
    if (routes?.length) {
      locales.forEach((lang) => {
        routes.forEach((item) => {
          if (item.meta && item.meta.notChangePath) {
            const nameRoute = item.name ? item.name : undefined
            newRoutes.push({
              name: nameRoute,
              path: item.path,
              component: item.component,
              meta: item.meta,
              children: item.children && item.children.length ? changeChildrenRoute(item.children, lang) : []
            })
          } else if (lang === 'ru') {
            const nameRoute = item.name ? `${item.name}___${lang}` : undefined
            newRoutes.push({
              name: nameRoute,
              path: item.path,
              component: item.component,
              meta: item.meta,
              children: item.children && item.children.length ? changeChildrenRoute(item.children, lang) : []
            })
          } else {
            const nameRoute = item.name ? `${item.name}___${lang}` : undefined
            newRoutes.push({
              name: nameRoute,
              path: `/${lang}${item.path}`,
              component: item.component,
              meta: item.meta,
              children: item.children && item.children.length ? changeChildrenRoute(item.children, lang) : []
            })
          }
        })
      })
    }
    return newRoutes
  }

  const router = new Router({
    mode: 'history',
    routes: [
      ...addLocalesToRoutes(commonRoutes),
      ...addLocalesToRoutes(productRoutes),
      ...addLocalesToRoutes(shopRoutes),
      ...addLocalesToRoutes(profileRoutes),
      ...addLocalesToRoutes(accountRoutes),
      {
        path: '/uz/*',
        component: load('page/404'),
        name: 'not_found___uz',
        meta: {
          title: 'Not found',
          notChangePath: true
        }
      }
    ],
    linkActiveClass: 'nuxt-link-active',
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition
      } else if (to.hash) {
        return {
          selector: to.hash
        }
      } else if (!to.meta.disableScroll) {
        return { x: 0, y: 0 }
      }
    }
  })

  return router
}
