/* global FormData */
import fetch from 'isomorphic-fetch'
import NProgress from 'nprogress'

const baseURL = newband.lms.AUTH_HOST

function checkStatus (res) {
  if (res.status >= 200 && res.status < 300) {
    return res.json()
  }

  const error = new Error(res.statusText)
  error.response = res
  throw error
}

function handelData (res) {
  NProgress.done()
  return res
}

function handleError (error) {
  NProgress.done()
  console.error(error.stack)
}

export function post (url, data) {
  NProgress.start()
  let body = new FormData()
  for (let key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      body.append(key, data[key])
    }
  }
  return fetch(baseURL + url, { body, method: 'post' })
         .then(checkStatus)
         .then(handelData)
         .catch(handleError)
}

export function get (url) {
  NProgress.start()
  return fetch(baseURL + url)
         .then(checkStatus)
         .then(handelData)
         .catch(handleError)
}
