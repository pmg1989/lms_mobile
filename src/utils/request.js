/* global FormData */
import fetch from 'isomorphic-fetch'
import NProgress from 'nprogress'
import { browserHistory } from 'react-router'
import { appConstants } from 'constants'
import { isApp } from 'utils/app'

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
  if (res.errorcode && res.errorcode === 'invalidtoken') {
    browserHistory.push(isApp() ? '/introduce' : '/login')
    return false
  }
  return res
}

function handleError (error) {
  NProgress.done()
  console.error(error.stack)
}

export function request (data, method = 'POST') {
  if (!localStorage.getItem(appConstants.UTOKEN) || !localStorage.getItem(appConstants.API_DOMAIN)) {
    browserHistory.push(isApp() ? '/introduce' : '/login')
  }
  NProgress.start()
  let body = new FormData()
  body.append('wstoken', localStorage.getItem(appConstants.UTOKEN))
  body.append('moodlewsrestformat', 'json')
  for (let key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      body.append(key, data[key])
    }
  }
  const baseURL = localStorage.getItem(appConstants.API_DOMAIN)
  return fetch(baseURL, { body, method })
         .then(checkStatus)
         .then(handelData)
         .catch(handleError)
}

export function get (url) {
  NProgress.start()
  const baseURL = localStorage.getItem(appConstants.API_DOMAIN)
  return fetch(baseURL + url)
         .then(checkStatus)
         .then(handelData)
         .catch(handleError)
}

export function request2 (baseURL, data, method = 'POST') {
  NProgress.start()
  let body = new FormData()
  for (let key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      body.append(key, data[key])
    }
  }
  return fetch(baseURL, { body, method })
    .then(checkStatus)
    .then(handelData)
    .catch(handleError)
}
