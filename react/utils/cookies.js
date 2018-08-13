// Helper cookie function
export const setCookie = (key, value, expireDays) => {
  key = key.replace(/[^#$&+\^`|]/g, encodeURIComponent)
  key = key.replace(/\(/g, '%28').replace(/\)/g, '%29')
  value = (value + '').replace(/[^!#$&-+\--:<-\[\]-~]/g, encodeURIComponent)

  let cookieString = key + '=' + value

  if (expireDays) {
    const expireDate = new Date()
    expireDate.setDate(expireDate.getDate() + expireDays)
    cookieString += '; expires=' + expireDate.toUTCString()
  }

  document.cookie = cookieString
}

// Helper cookie function
export const deleteCookie = name => {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}
