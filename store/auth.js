import { getCookieData, setCookieData } from '~/utils/cookieData'

export const namespaced = true

export const state = () => ({
  user: {},
  loggedIn: false
})

export const getters = {
  getLoggedIn: (state) => state.loggedIn
}

export const actions = {
  loginData({ commit }, data) {
    setCookieData('token', data.auth_token)
    commit('SET_STATUS', !!data.auth_token)
  },
  initAuth({ commit }) {
    const token = getCookieData('token')
    commit('SET_STATUS', !!token)
  }
}

export const mutations = {
  SET_STATUS(state, status) {
    state.loggedIn = status
  }
}
