export function getCookieKey(key) {
  if (process.browser) {
    return localStorage.getItem(key)
  }
}

export function setCookieKey(key, value) {
  if (process.browser) {
    return localStorage.setItem(key, value)
  }
}

export function removeCookieKey(key) {
  if (process.browser) {
    return localStorage.removeItem(key)
  }
}
