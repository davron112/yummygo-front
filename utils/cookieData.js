import Cookies from 'js-cookie'

export function getCookieData(key) {
  return Cookies.get(key)
}

export function setCookieData(key, value, expireDay) {
  let expire = { expires: 360 }
  if (expireDay) {
    expire = { expires: expireDay }
  }
  return Cookies.set(key, value, expire)
}

export function removeCookieData(key) {
  return Cookies.remove(key)
}
