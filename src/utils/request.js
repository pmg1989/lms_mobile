/* global FormData */
import fetch from 'isomorphic-fetch'
import NProgress from 'nprogress'
import { appConstants } from 'constants'
// import { authHost } from 'utils/config'

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

export function request (data, method = 'POST') {
  NProgress.start()
  let body = new FormData()
  body.append('wstoken', sessionStorage.getItem(appConstants.UTOKEN))
  body.append('moodlewsrestformat', 'json')
  for (let key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      body.append(key, data[key])
    }
  }
  const baseURL = sessionStorage.getItem(appConstants.API_DOMAIN)
  return fetch(baseURL, { body, method })
         .then(checkStatus)
         .then(handelData)
         .catch(handleError)
}

export function get (url) {
  NProgress.start()
  const baseURL = sessionStorage.getItem(appConstants.API_DOMAIN)
  return fetch(baseURL + url)
         .then(checkStatus)
         .then(handelData)
         .catch(handleError)
}

export function auth (phone, token) {
  // const url = `${NEWBAND.LMS.AUTH_HOST}/apptoken/${token}/phone/${phone}`
  // const url = `${authHost}/apptoken/${token}/phone/${phone}`
  const url = `/v1/Login/phonelogin/apptoken/${token}/phone/${phone}`
  return fetch(url, { method: 'post' })
         .then(checkStatus)
         .then(handelData)
         .catch(handleError)
}
