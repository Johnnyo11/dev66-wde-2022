import request from '@/utils/request'

export function signup(username, email, password) {
  return request({
    url: '/auth/local/register',
    method: 'post',
    data: {
      username: username,
      email: email,
      password: password
    }
  })
}

