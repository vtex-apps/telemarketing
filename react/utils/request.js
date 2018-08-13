const MAX_RETRIES = 3

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
