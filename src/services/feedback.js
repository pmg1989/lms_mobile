import { request } from 'utils/request'

export function fetchFeedbackList (params) {
  return request({ wsfunction: 'mod_frontservice_feedback_todo', ...params })
}

export function fetchFeedbackItem (params) {
  return request({ wsfunction: 'mod_frontservice_getsubmission', ...params })
}

export function fetchFeedbackLesson (params) {
  return request({ wsfunction: 'mod_frontservice_getlessoninfo', ...params })
}

export function fetchSubmitFeedback (params) {
  return request({ wsfunction: 'mod_frontservice_dosubmission', ...params })
}
