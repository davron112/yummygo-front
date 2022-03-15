import { getDeliveryRestaurants } from '~/http/restaurants'

export const namespaced = true

export const state = () => ({
  restaurants: []
})

export const getters = {
  getRestaurants: (state) => state.restaurants
}

export const actions = {
  async fetchRestaurants({ commit }, cords) {
    await getDeliveryRestaurants(cords)
      .then((response) => {
        const { data } = response
        commit('SET_ITEMS', data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export const mutations = {
  SET_ITEMS(state, items) {
    state.restaurants = items
  }
}
