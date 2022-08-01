import request from '@/utils/request.js'
import { getStorage } from '@/utils/storage'
/*
登录接口
axios内部会把参数对象转成json字符串发给后台，会自动携带请求参数（header)里
Content-type:'application/json'帮你添加好
*/
export const loginAPI = ({ mobile, code }) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}
/*
用户刷新token接口
*/
export const getNewTokenAPI = () => {
  return request({
    url: '/v1_0/authorizations',
    method: 'PUT',
    headers: {
      Authorization: 'Bearer ' + getStorage('refresh_token')
    }
  })
}
