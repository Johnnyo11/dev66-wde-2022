import request from '@/utils/request'

export function getUsers(params) {
  return request({
    url: '/users' + params,
    method: 'get'
  })
}

export function getUserById(id) {
  return request({
    url: '/users/' + id,
    method: 'get'
  })
}

export function updateUser(id, data) {
  return request({
    url: '/users/' + id,
    method: 'put',
    data
  })
}

export function registerUser(data) {
  return request({
    url: '/auth/local/register',
    method: 'post',
    data
  })
}

export function removeUser(id) {
  return request({
    url: '/users/' + id,
    method: 'delete'
  })
}

export function getService() {
  return request({
    url: '/services/all',
    method: 'get'
  })
}

export function getServiceByPackage(pkg, size, page, find, dates, dateType) {
  return request({
    url: '/services/all/' + process.env.SERVICE_NAME + '/' + pkg,
    method: 'get',
    params: {
      size: size,
      page: page,
      find: find,
      startDate: dates,
      dateType: dateType
    }
  })
}

export function forceJoinService(body) {
  return request({
    url: '/services/forcejoin/' + process.env.SERVICE_NAME,
    method: 'post',
    data: body
  })
}

export function updateProfile(id, body) {
  return request({
    url: '/services/all/' + process.env.SERVICE_NAME + '/' + id,
    method: 'put',
    data: body
  })
}

export function removeProfile(id) {
  return request({
    url: '/services/all/' + process.env.SERVICE_NAME + '/' + id,
    method: 'delete'
  })
}

export function listServiceByPackage(pkg) {
  return request({
    url: '/services/list/' + process.env.SERVICE_NAME + '/' + pkg,
    method: 'get'
  })
}