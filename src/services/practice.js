import { request } from 'utils/request'

export function fetchPracticeList (params) {
  return request({ wsfunction: 'mod_frontservice_get_practice_songs', ...params })
}
