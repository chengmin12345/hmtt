// 基于axios封装网络请求
import router from '@/router' // 引入路由
import axios from 'axios'
import Notify from '@/ui/Notify'
import { getToken, removeToken } from './token'
// import { getNewTokenAPI } from '@/api'

const myAxios = axios.create({
  baseURL: 'http://geek.itheima.net',
  timeout: 20000 // 20s超时间
})
// 添加请求拦截器
myAxios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 目标: 统一携带token
  // 判断本地有token再携带, 判断具体api/index.js里如果没有携带Authorization, 我在添加上去
  // 未定义叫undefined, null具体的值你得赋予才叫空
  // ?. 可选链操作符, 如果前面对象里没有length, 整个表达式原地返回undefined
  // 如果getToken()在原地有值token字符串, 才能调用length获取长度
  if (getToken()?.length > 0 && config.headers.Authorization === undefined) {
    config.headers.Authorization = `Bearer ${getToken()}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response
},
async function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  if (error.response.status === 401) {
    Notify({ type: 'warning', message: '身份过期，请重新登录！！' })
    removeToken()
    // 方法1：跳转回登录页，用户有感知（体验不好）
    router.replace(`/login?path=${router.currentRoute.fullPath}`)
    // 方法2token失效用新的token，无感知，体验好
  //   // 调接口：获取新token的接口
  //   const res = await getNewTokenAPI()
  //   // 拿到新的token ,要做什么？
  //   // 1、更新token在本地
  //   setToken(res.data.data.token)
  //   // 2、更新新的token在请求头
  //   error.config.headers.Authorization = `Bearer ${res.data.data.token}`
  //   // 3、未完成这次请求，再发一次
  //   // error.config就是上一次请求的配置对象
  //   // 结果要return回逻辑页面调用的地方，return一个Promise对象
  //   return myAxios(error.config)
  // } else if (error.response.status === 500 && error.config.url === '/v1_0/authorizations' && error.config.method === 'put') {
  //   // 刷新的refresh_token也过期了
  //   localStorage.clear() // 清除localStorage所有值
  //   Notify({ type: 'warning', message: '身份过期，请重新登录！！' })
  //   router.replace('/login')
  }
  return Promise.reject(error)
})

// 封装了一层自定义函数
export default ({ url, method = 'GET', params = {}, data = {}, headers = {} }) => {
  return myAxios({
    url,
    method,
    params,
    data,
    headers
  })
}
