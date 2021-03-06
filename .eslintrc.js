module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'plugin:vue/recommended', 'prettier', 'prettier/vue'],
  plugins: ['import', 'vue', 'prettier', 'vuetify'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.vue']
      }
    }
  },
  rules: {
    'vue/no-v-html': 'off',
    'no-console': 'off',
    'no-param-reassign': 'off',
    'import/no-extraneous-dependencies': 'off',
    'prettier/prettier': 'error',
    'vuetify/no-deprecated-classes': 'error'
  }
}
