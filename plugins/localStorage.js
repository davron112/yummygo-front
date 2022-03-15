import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'vuex',
    paths: ['cart', 'auth', 'address', 'region', 'chat']
  })(store)
}
