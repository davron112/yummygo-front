import axios from 'axios'
import Message from '@/components/packages/message/main'
import { getCookieKey } from '@/utils/cookieStore'
import { getCookieData } from '~/utils/cookieData'

const service = axios.create({
  baseURL: process.env.API_DOMEN,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000 // request timeout
})
service.interceptors.request.use(
  (config) => {
    const langCode = getCookieKey('langCode')
    const allowedLanguages = ['ru', 'uz']
    let activeLangCode = 'ru'
    if (config.params && config.params.lang) {
      activeLangCode = config.params.lang
    } else if (langCode && allowedLanguages.includes(langCode)) {
      activeLangCode = langCode
    }
    config.headers.Language = activeLangCode
    const accessToken = getCookieData('token')
    if (accessToken) {
      config.headers.Authorization = 'Bearer ' + accessToken
    }
    const fingerprint = getCookieKey('fingerprint')
    if (fingerprint) {
      config.headers.fingerprint = fingerprint
    }
    return config
  },
  (error) => {
    // do something with request error
    console.error(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    return response
  },
  (error) => {
    if (!error.response) {
      Message({
        dangerouslyUseHTMLString: true,
        message: '<strong>Ma`lumot yuklanmadi</strong>',
        customClass: 'customMessage',
        type: 'warning',
        duration: 5 * 1000
      })
      // return service(error.config)
    } else if (error.response && error.response.status === 422) {
      let message = error.response.data.fields[0] ? error.response.data.fields[0].value : ''
      if (!message) {
        message = 'Iltimos, maʼlumotlarni qayta tekshiring.'
      }
      Message({
        dangerouslyUseHTMLString: true,
        message: '<strong>' + message + '</strong>',
        customClass: 'customMessage',
        type: 'error',
        duration: 5 * 1000
      })
    } else if (error.response && error.response.status === 500) {
      Message({
        dangerouslyUseHTMLString: true,
        message: '<strong>Tizimda xatolik</strong>',
        customClass: 'customMessage',
        type: 'error',
        duration: 5 * 1000
      })
    } else if (error.response.status !== 401) {
      let messageText = 'Tizimda xatolik'
      if (error.response.data.message) {
        messageText = error.response.data.message
      }
      Message({
        dangerouslyUseHTMLString: true,
        message: '<strong>' + messageText + '</strong>',
        customClass: 'customMessage',
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
