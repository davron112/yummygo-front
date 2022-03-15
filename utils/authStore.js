const TokenKey = 'Access-Token'

export function getToken() {
  if (process.browser) {
    return localStorage.getItem(TokenKey)
  }
}

export function setToken(token) {
  if (process.browser) {
    return localStorage.setItem(TokenKey, token)
  }
}

export function removeToken() {
  if (process.browser) {
    return localStorage.removeItem(TokenKey)
  }
}
