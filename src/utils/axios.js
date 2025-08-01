import axios from 'axios'
import store from '@/components/store'
import config from '@/config'

const api = axios.create({
  baseURL: config.api.baseURL + '/',
})

// 请求拦截器：自动添加认证头
api.interceptors.request.use(config => {
  const token = store.getters['auth/authToken']
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器：处理401未授权
api.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response && error.response.status === 401) {
    store.dispatch('auth/logout')
    // 重定向到登录页
    if (window.location.pathname !== '/login') {
      window.location.reload() // 刷新页面以重置状态
    }
  }
  return Promise.reject(error)
})

export default api