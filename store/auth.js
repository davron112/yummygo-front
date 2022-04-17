import { getCookieData, setCookieData } from '~/utils/cookieData'
import { getUserInfo } from '~/http/user'

export const namespaced = true

export const state = () => ({
  user: {},
  userInfo: {},
  loggedIn: false
})

export const getters = {
  getLoggedIn: (state) => state.loggedIn,
  userInfo: (state) => state.userInfo
}

export const actions = {
  loginData({ commit }, data) {
    setCookieData('token', data.auth_token)
    commit('SET_STATUS', !!data.auth_token)
  },
  initAuth({ commit }) {
    const token = getCookieData('token')
    commit('SET_STATUS', !!token)
  },
  async loadUserInfo({ commit, state }) {
    if (!state.loggedIn) return
    await getUserInfo()
      .then((response) => {
        commit('SET_USER_INFO', response.data)
      })
      .catch((error) => {
        commit('SET_USER_INFO', {})
        console.error(error)
      })
  }
}

export const mutations = {
  SET_STATUS(state, status) {
    state.loggedIn = status
  },
  SET_USER_INFO(state, data) {
    state.userInfo = data
  }
}
