import { request } from 'utils/request'

export function fetchSendCode (params) {
  return request({ wsfunction: 'mod_serviceauthorize_sendsmscode', ...params })
}

export function fetchSmsLogin (params) {
  return request({ wsfunction: 'mod_serviceauthorize_phonelogin', ...params })
}
