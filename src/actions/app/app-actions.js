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
    fetchAuthLogin({ phone: mobile, apptoken: token }).then(({ status, data }) => {
      const authorized = status === 10000
      data.authorized = authorized
      data.mobile = mobile
      if (!data.image) {
        data.image = './images/avatar.png'
      }
      if (authorized) {
        zhugeio.login(data)
        localStorage.setItem(appConstants.UTOKEN, data.utoken)
      } else {
        localStorage.removeItem(appConstants.UTOKEN)
      }
      return data
    }).then(data => dispatch(authLoginSuccess(data)))
  )
)

export const getUserInfo = () => (
  () => {
    return fetchUserInfo().then(({ status }) => {
      const authorized = status === 10000
      return { authorized }
    })
  }
)
