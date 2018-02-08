import Immutable from 'immutable'
import { Toast } from 'antd-mobile'
import { browserHistory } from 'react-router'
import zhugeio from 'utils/zhugeio'
import { appConstants, loginConstants } from 'constants'
import { fetchSendCode, fetchSmsLogin } from 'services/login'
import { authLoginSuccess } from '../app/app-actions'

const sendCodeSuccess = login => ({
  login: Immutable.fromJS(login),
  type: loginConstants.FETCH_SEND_SMS,
})

export const resetStatus = () => ({
  type: loginConstants.RESET_SEND_SMS,
})

const showLoading = model => ({
  type: loginConstants.SHOW_LOADING,
  model: Immutable.fromJS(model),
})

const hideLoading = model => ({
  type: loginConstants.HIDE_LOADING,
  model: Immutable.fromJS(model),
})

export const sendCode = phone => (
  dispatch => (
    new Promise(resolve => resolve(dispatch(showLoading({ sendCode: true }))))
      .then(fetchSendCode({ phone }).then(({ status, data }) => {
        if (status === 10000) {
          return { smsStatus: 1, sid: data.sid }
        }
        const msg = {
          10001: '手机号码不正确！',
          10002: '此手机号不是校区学员！',
          10003: '60s内短信只能发送一次！',
          10004: '发送次数超过最近24小时上限！',
        }
        Toast.info(msg[status])
        return { smsStatus: -1 }
      })
    .then(data => dispatch(sendCodeSuccess(data)))
    .then(() => dispatch(hideLoading({ sendCode: false }))))
  )
)

export const smsLogin = ({ phone, smscode, sid }) => (
  dispatch => (
    new Promise(resolve => resolve(dispatch(showLoading({ submit: true }))))
      .then(fetchSmsLogin({ phone, smscode, sid }).then(({ status, data }) => {
        const authorized = status === 10000
        data.authorized = authorized
        data.mobile = phone
        if (!data.image) {
          data.image = './images/avatar.png'
        }
        if (authorized) {
          zhugeio.login(data)
          localStorage.setItem(appConstants.UTOKEN, data.utoken)
          localStorage.setItem(appConstants.API_DOMAIN, data.wsurl)
          localStorage.setItem(appConstants.USER_INFO, JSON.stringify(data))
        } else {
          const msg = {
            10001: '此手机号不是校区学员！',
            10002: '短信验证码错误！',
          }
          Toast.info(msg[status])
          localStorage.removeItem(appConstants.UTOKEN)
          localStorage.removeItem(appConstants.API_DOMAIN)
          localStorage.removeItem(appConstants.USER_INFO)
        }
        return data
      })
    .then((data) => {
      dispatch(authLoginSuccess(data))
      data.authorized && browserHistory.push('/')
    })
    .then(() => dispatch(hideLoading({ submit: false }))))
  )
)
