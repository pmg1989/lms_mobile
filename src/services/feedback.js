import { request } from 'utils/request'

export function fetchFeedbackList (params) {
  return request({ wsfunction: 'mod_frontservice_get_enrolledlessons_cc', ...params })
}

export function fetchFeedbackItem (params) {
  return request({ wsfunction: 'mod_frontservice_getsubmission', ...params })
}

export function fetchSubmitFeedback (params) {
  return request({ wsfunction: 'mod_frontservice_dosubmission', ...params })
}
