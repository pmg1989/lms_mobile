import { request } from 'utils/request'

export function fetchPracticeList (params) {
  return request({ wsfunction: 'mod_frontservice_get_practice_songs', ...params })
}

export function fetchPracticeItem (params) {
  return request({ wsfunction: 'mod_frontservice_get_practice_songs', ...params })
}

export function fetchPracticeHistory (params) {
  return request({ wsfunction: 'mod_frontservice_save_practise_history', ...params })
}
