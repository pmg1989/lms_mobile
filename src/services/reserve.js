import { request } from 'utils/request'

export function fetchReserveList (params) {
  return request({ wsfunction: 'mod_frontservice_get_accessiblelessons_cc', ...params })
}
