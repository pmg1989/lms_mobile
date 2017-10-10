import Immutable from 'immutable'
import { auth } from 'utils/request'
import { appConstants } from 'constants'

export const authLoginSuccess = app => ({ app: Immutable.fromJS(app), type: appConstants.AUTH_LOGIN_SUCCESS })

export const authLogin = (mobile, token) => (
  dispatch => (
    auth(mobile, token).then(json => {
      const data = json.data
      data.mobile = mobile
      data.authorized = json.status === 10000
      return data
    }).then(data => dispatch(authLoginSuccess(data)))
  )
)
