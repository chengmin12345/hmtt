import request from '@/utils/request.js'
import { getToken } from '@/utils/token'
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
获取用户频道接口
*/
export const getUserChannelAPI = () => {
  return request({
    url: '/v1_0/user/channels',
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
}
/*
获取文章列表接口
*/
export const getAllArticleAPI = ({ channel_id, timestamp }) => {
  return request({
    url: '/v1_0/articles',
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    params: {
      channel_id,
      timestamp
    }
  })
}
