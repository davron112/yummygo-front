import request from './axios'

export function getDeliveryRestaurants(data) {
  return request({
    url: `/api/get-delivery-restaurants`,
    method: 'post',
    data
  })
}

export function getRestaurantSlides() {
  return request({
    url: `/api/get-restaurant-category-slides`,
    method: 'post'
  })
}

export function getPromoSlides() {
  return request({
    url: `/api/promo-slider`,
    method: 'post'
  })
}

export function getRestaurantItems(slug) {
  return request({
    url: `/api/get-restaurant-items/${slug}`,
    method: 'post'
  })
}

export function getRestaurantInfo(slug) {
  return request({
    url: `/api/get-restaurant-info//${slug}`,
    method: 'post'
  })
}
