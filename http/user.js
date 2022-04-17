import request from '@/http/axios'

export function getUserInfo(data) {
  return request({
    url: `/api/update-user-info`,
    method: 'post',
    data
  })
}
