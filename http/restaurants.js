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
    method: 'get'
  })
}
