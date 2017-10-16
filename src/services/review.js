import { request } from 'utils/request'

export function fetchReviewInfo (params) {
  return request({ wsfunction: 'mod_frontservice_get_assignfeedbackcomment', ...params })
}
