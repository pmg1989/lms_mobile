import Immutable from 'immutable'
import { auth } from 'utils/request'
import { appConstants } from 'constants'

export const authLoginSuccess = app => ({
  app: Immutable.fromJS(app),
  type: appConstants.AUTH_LOGIN,
})

export const authLogin = (mobile, token) => (
  dispatch => (
    auth(mobile, token).then(({ status, data }) => {
      const authorized = status === 10000
      data.authorized = authorized
      data.mobile = mobile
      if (authorized) {
        sessionStorage.setItem(appConstants.UTOKEN, data.utoken)
        sessionStorage.setItem(appConstants.API_DOMAIN, data.wsurl)
      } else {
        sessionStorage.removeItem(appConstants.UTOKEN)
        sessionStorage.removeItem(appConstants.API_DOMAIN)
      }
      return data
    }).then(data => dispatch(authLoginSuccess(data)))
  )
)
