import { request } from 'utils/request'

export function fetchFeedbackList (params) {
  return request({ wsfunction: 'mod_frontservice_get_enrolledlessons_cc', ...params })
}
