import { request } from 'utils/request'

export function fetchNotice (params) {
  return request({ wsfunction: 'mod_frontservice_get_ads', ...params })
}

export function fetchCourseList (params) {
  return request({ wsfunction: 'mod_frontservice_my_contractccs', ...params })
}

export function fetchRecordList (params) {
  return request({ wsfunction: 'mod_frontservice_get_student_recordings', ...params })
}
