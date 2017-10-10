import { request } from 'utils/request'

export async function addSend (params) {
  return request('v2/sendins', {
    method: 'post',
    data: params,
  })
}
