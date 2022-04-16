import request from '@/http/axios'

export function orderCreate(data) {
  return request({
    url: `/api/place-order`,
    method: 'post',
    data
  })
}
