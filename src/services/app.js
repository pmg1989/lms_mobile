import { request } from 'utils/request'

export function fetchAuthLogin (params) {
  return request({ wsfunction: 'mod_serviceauthorize_applogin', ...params })
}

export function fetchUserInfo (params) {
  return request({ wsfunction: 'mod_frontservice_getuserbyid', ...params })
}
