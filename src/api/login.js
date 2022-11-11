import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/auth/local',
    method: 'post',
    data: {
      identifier: username,
      password: password
    }
  })
}

export function getInfo() {
  return request({
    url: '/users/me',
    method: 'get'
  })
}

export function getService() {
  return request({
    url: '/services/personal/' + process.env.SERVICE_NAME,
    method: 'get'
  })
}

export function joinService(username, email, role, userData) {
  return request({
    url: '/services/join/' + process.env.SERVICE_NAME,
    method: 'post',
    data: {
      username,
      email,
      role,
      userData
    }
  })
}

export function joinFilesService(data) {
  return request({
    url: '/services/joinFiles/' + process.env.SERVICE_NAME,
    method: 'post',
    headers: { 'content-type': 'multipart/form-data' },
    data
  })
}

export function modifyProfile(userData) {
  return request({
    url: '/services/modify/' + process.env.SERVICE_NAME,
    method: 'post',
    data: {
      userData: userData
    }
  })
}

export function changePassword(data) {
  return request({
    url: '/auth/change-password',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'get'
  })
}
