import { join } from 'path'
import webpack from 'webpack'

export default {
  ssr: process.env.SEO_ENABLE === 'true',
  server: {
    port: process.env.SERVER_PORT,
    host: process.env.SERVER_IP
  },
  rootDir: __dirname,
  /*
   ** Headers of the page
   */
  head: {
    title: 'Yammi - Yaqinigizdagi restorandan yetkazib berish',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'cache-control', content: 'no-cache' },
      { 'http-equiv': 'expires', content: '0' },
      { 'http-equiv': 'pragma', content: 'no-cache' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { property: 'og:image:width', content: '800' },
      { property: 'og:image:height', content: '530' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }]
  },
  generate: {
    fallback: true,
    minify: {
      collapseWhitespace: false
    }
  },
  loadingIndicator: {
    name: 'pulse',
    color: '#ffffff',
    background: '#ffffff'
  },
  env: {
    app: process.env.NODE_ENV,
    NODE_ENV: process.env.NODE_ENV,
    baseUrl: process.env.API_URL,
    API_DOMEN: process.env.API_DOMEN,
    appVersion: process.env.APP_VERSION,
    IMAGE_BASE_URL: process.env.IMAGE_BASE_URL,
    imageOptimizationUrl: process.env.IMAGE_OPTIMIZER_URL
  },
  /*
   ** Customize the progress-bar color
   */
  loading: false,
  /*
   ** Global CSS
   */
  css: ['@/assets/scss/app.scss', '@/assets/scss/iconmoon.scss', 'swiper/dist/css/swiper.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/scroll.js', ssr: true },
    { src: '~/plugins/mixins.js', ssr: true },
    { src: '~/plugins/portal-vue.js', ssr: true },
    { src: '~/plugins/plugin.js', ssr: false },
    { src: '~/plugins/localStorage.js', mode: 'client' }
  ],
  buildModules: [
    '@nuxtjs/moment',
    'nuxt-purgecss',
    '@nuxtjs/google-fonts',
    '@nuxtjs/eslint-module',
    [
      '@nuxtjs/router',
      {
        path: join(__dirname, 'router'),
        fileName: 'index.js'
      }
    ]
  ],
  purgeCSS: {
    enabled: ({ isDev, isClient }) => !isDev && isClient, // or `false` when in dev/debug mode
    paths: ['components/**/*.vue', 'layouts/**/*.vue', 'pages/**/*.vue', 'plugins/**/*.js'],
    styleExtensions: ['.css'],
    whitelist: ['body', 'html', 'nuxt-progress'],
    extractors: [
      {
        extractor: (content) => content.match(/[A-z0-9-:\\/]+/g) || [],
        extensions: ['html', 'vue', 'js']
      }
    ]
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/gtm',
    '@nuxtjs/bulma',
    '@nuxtjs/proxy',
    '@nuxtjs/sitemap',
    '@forked-prs/nuxt-infinite-scroll-module',
    [
      'nuxt-i18n',
      {
        baseUrl: 'https://yammi.uz',
        seo: true,
        locales: [
          {
            code: 'ru',
            iso: 'ru',
            name: 'Русский',
            file: 'ru.json'
          },
          {
            code: 'uz',
            iso: 'uz',
            name: "O'zbekcha",
            file: 'uz.json'
          }
        ],
        detectBrowserLanguage: {
          useCookie: true,
          cookieKey: 'i18n_redirected'
        },
        defaultLocale: 'ru',
        lazy: true,
        langDir: 'static/lang/',
        fallbackLocale: ['uz']
      }
    ],
    'vue-screen/nuxt',
    '@nuxtjs/axios',
    'vue-scrollto/nuxt',
    '@nuxtjs/pwa',
    '@nuxtjs/robots'
  ],
  axios: {
    baseURL: '/',
    browserBaseURL: '/'
  },
  proxy: {
    '/api': {
      target: process.env.API_URL,
      secure: false,
      pathRewrite: { '^/api': '' }
    }
  },
  gtm: {
    id: process.env.GTM_CODE,
    scriptDefer: true,
    enabled: true,
    layer: 'dataLayer',
    debug: false
  },
  googleFonts: {
    prefetch: true,
    display: 'swap',
    families: {
      Rubik: {
        wght: [100, 400, 600, 700]
      }
    }
  },
  robots: [
    {
      UserAgent: '*'
    },
    {
      Disallow: '/api/*'
    },
    {
      Disallow: '/uz/profile/*'
    },
    {
      UserAgent: 'Googlebot',
      Disallow: ''
    },
    {
      UserAgent: 'Googlebot-Image',
      Disallow: ''
    },
    {
      UserAgent: 'WebZIP',
      Disallow: '/'
    },
    {
      UserAgent: 'WebSnake',
      Disallow: '/'
    },
    {
      UserAgent: 'Offline Explorer',
      Disallow: '/'
    },
    {
      UserAgent: 'Wget',
      Disallow: '/'
    },
    {
      UserAgent: 'DISCo Pump',
      Disallow: '/'
    },
    {
      UserAgent: 'SemrushBot',
      Disallow: '/'
    },
    {
      UserAgent: 'Baiduspider',
      Disallow: '/'
    },
    {
      UserAgent: 'ExaBot',
      Disallow: '/'
    },
    {
      UserAgent: 'MJ12bot',
      Disallow: '/'
    },
    {
      UserAgent: 'CrazyWebCrawler-Spider',
      Disallow: '/'
    },
    {
      UserAgent: 'psbot',
      Disallow: '/'
    },
    {
      UserAgent: 'Teleport Pro',
      Disallow: '/'
    },
    {
      UserAgent: 'gigabot',
      Disallow: '/'
    },
    {
      UserAgent: 'Web-By-Mail',
      Disallow: '/'
    },
    {
      UserAgent: 'Twiceler',
      Disallow: '/'
    },
    {
      UserAgent: 'ia_archiver',
      Disallow: '/'
    },
    {
      UserAgent: 'NetinfoBot',
      Disallow: '/'
    },
    {
      Sitemap: 'https://yammi.uz/sitemap.xml'
    },
    {
      Host: 'https://yammi.uz'
    }
  ],
  sitemap: {
    path: '/sitemap.xml',
    xmlNs: 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    sitemaps: []
  },
  pwa: {
    manifest: {
      name: 'Yammi',
      short_name: 'Yammi',
      theme_color: '#00b2a9',
      background_color: '#00b2a9',
      start_url: 'https://yammi.uz',
      display: 'standalone',
      orientation: 'portrait',
      description: 'Yammi - Ovqat yetkazish xizmati'
    },
    icon: '/icon.png',
    meta: {
      description: 'Yammi - Ovqat yetkazish xizmati',
      author: 'Achilov Davronbek'
    },
    workbox: false
  },
  /*
   ** Build configuration
   */
  build: {
    publicPath: process.env.PUBLIC_PATH_BUILD,
    filenames: {
      app: ({ isDev }) => (isDev ? `[name].modern.js` : `[name].modern.js?v=[contenthash:7]`),
      chunk: ({ isDev }) => (isDev ? `[name].modern.js` : `[name].modern.js?v=[contenthash:7]`),
      img: () => '[path][name].[ext]',
      css: ({ isDev }) => (isDev ? '[name].css' : '[name].css?v=[contenthash:7]')
    },
    babel: {
      compact: true
    },
    splitChunks: {
      layouts: false,
      pages: true,
      commons: true
    },
    html: {
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true
      }
    },
    transpile: ['vee-validate/dist/rules'],
    parallel: false,
    cache: false,
    hardSource: false,
    plugins: [
      new webpack.ProvidePlugin({
        _: 'lodash'
      })
    ],
    /*
     ** You can extend webpack config here
     */
    extend(config, { isDev }) {
      if (isDev) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
          options: {
            fix: true
          }
        })
      }
    }
  }
}
