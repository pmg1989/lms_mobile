import Immutable from 'immutable'
import zhugeio from 'utils/zhugeio'
import { appConstants } from 'constants'
import { fetchAuthLogin, fetchUserInfo } from 'services/app'

export const authLoginSuccess = app => ({
  app: Immutable.fromJS(app),
  type: appConstants.AUTH_LOGIN,
})

export const authLogin = (mobile, token) => (
  dispatch => (
    fetchAuthLogin({ mobile, token }).then(({ status, data }) => {
      const authorized = status === 10000
      data.authorized = authorized
      data.mobile = mobile
      if (!data.image) {
        data.image = './images/avatar.png'
      }
      if (authorized) {
        zhugeio.login(data)
        localStorage.setItem(appConstants.UTOKEN, data.utoken)
        localStorage.setItem(appConstants.API_DOMAIN, data.wsurl)
      } else {
        localStorage.removeItem(appConstants.UTOKEN)
        localStorage.removeItem(appConstants.API_DOMAIN)
      }
      return data
    }).then(data => dispatch(authLoginSuccess(data)))
  )
)

export const getUserInfo = () => (
  () => {
    if (!localStorage.getItem(appConstants.API_DOMAIN)) {
      return new Promise(resolve => (resolve({ authorized: false })))
    }
    return fetchUserInfo().then(({ status }) => {
      const authorized = status === 10000
      return { authorized }
    })
  }
)
