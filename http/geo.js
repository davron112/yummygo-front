import request from '@/http/axios'

export function getAddressByCoords(data) {
  return request({
    url: `/api/coordinate-to-address`,
    method: 'post',
    data
  })
}
