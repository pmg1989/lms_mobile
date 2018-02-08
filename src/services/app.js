import { request, request2 } from 'utils/request'

export function fetchAuthLogin (params) {
  return request2(`/api/v1/Login/phonelogin/apptoken/${params.token}/phone/${params.mobile}`, params)
}

export function fetchUserInfo (params) {
  return request({ wsfunction: 'mod_frontservice_getuserbyid', ...params })
}
