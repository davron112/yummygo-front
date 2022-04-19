import { getAddressByCoords } from '@/http/geo'

export const namespaced = true

export const state = () => ({
  house: '',
  address: '',
  lat: '40.6976701',
  lng: '69.320704'
})

export const getters = {
  address: (state) => state.address,
  house: (state) => state.house,
  latitude: (state) => state.lat,
  longitude: (state) => state.lng
}

export const actions = {
  async addCoordinates({ commit }, { lat, lng }) {
    await getAddressByCoords({ lat, lng }).then((response) => {
      commit('SET_ADDRESS', response.data)
    })
    await commit('SET_COORDS', { lat, lng })
  }
}

export const mutations = {
  SET_COORDS(state, coordinates) {
    state.lat = coordinates.lat
    state.lng = coordinates.lng
  },
  SET_ADDRESS(state, address) {
    state.address = address
  }
}
