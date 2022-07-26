// 基于axios封装网络请求
import axios from 'axios'

const myAxios = axios.create({
  baseURL: 'http://geek.itheima.net',
  timeout: 20000 // 20s超时间
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
