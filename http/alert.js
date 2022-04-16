import request from '@/http/axios'

export function getAlerts() {
  return request({
    url: `/api/get-user-notifications`,
    method: 'post'
  })
}
