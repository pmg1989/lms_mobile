import { request2 } from 'utils/request'

export function fetchSendCode (params) {
  return request2('/api/v1/Login/sendsmscode', params)
}

export function fetchSmsLogin (params) {
  return request2('/api/v1/Login/smslogin', params)
}
