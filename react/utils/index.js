const MAX_RETRIES = 3

export const translate = (id, intl) => {
  return intl.formatMessage({ id: `${id}` })
}

const requestWithRetry = (url, params, retries, err) => {
  retries = retries || MAX_RETRIES

  if (retries > 1) {
    return request(url, params).catch(err => {
      return requestWithRetry(url, params, retries - 1, err)
    })
  } else {
    return Promise.reject(err)
  }
}

export { requestWithRetry as request }

const request = (url, params) => {
  params = params || {}

  if (fetch) {
    return fetch(url, {
      method: params.method ? params.method : 'GET',
      body: params.body ? params.body : null,
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(checkStatus)
      .then(parseJSON)
  }

  console.error('You need fetch to vtexjs.session to work!')
}

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

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  const error = new Error(response.statusText)
  error.response = response

  return Promise.reject(error)
}

function parseJSON(response) {
  return response.json()
}
