export const translate = (id, intl) => {
  return intl.formatMessage({ id: `${id}` })
}

export const request = (url, params) => {
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
  var error = new Error(response.statusText)
  error.response = response
  throw error
}

function parseJSON(response) {
  return response.json()
}
