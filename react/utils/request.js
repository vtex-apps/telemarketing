const MAX_RETRIES = 3

const requestWithRetry = (func, params, retries, err) => {
  if (retries !== 0)
    retries = retries || MAX_RETRIES

  if (retries > 0) {
    console.log()
    return func(params).catch(err => {
      return requestWithRetry(func, params, retries - 1, err)
    })
  } else {
    return Promise.reject(err)
  }
}

export default requestWithRetry
