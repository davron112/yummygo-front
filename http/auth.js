import request from '@/http/axios'

export function generateOtpLogin(data) {
  return request({
    url: `/api/send-otp`,
    method: 'post',
    data
  })
}

export function verifyOtpCode(data) {
  return request({
    url: `/api/verify-otp`,
    method: 'post',
    data
  })
}
