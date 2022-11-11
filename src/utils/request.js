import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
// import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 60000
})

// request
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Authorization'] = 'Bearer ' + store.getters.token
  }
  return config
}, error => {
  // Do something with request error
  // console.log(error) // for debug
  Promise.reject(error)
})

// response
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    // console.log('err response' + JSON.stringify(error.response))// for debug
    let errorMessage = ''
    if (error.response.status === 422) {
      errorMessage = `${Object.keys(error.response.data).map(err => error.response.data[err].length > 0 ? error.response.data[err][0] : error.response.data[err])}`
    } else if (error.response.status === 403) {
      // console.log(error.response)
      errorMessage = error.response.data.message
    } else {
      errorMessage = error.response.data.message || error.response.data.error
    }
    Message({
      message: errorMessage,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
