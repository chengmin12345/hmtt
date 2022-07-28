import request from '@/utils/request.js'
// import { getToken } from '@/utils/token'
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
    url: '/v1_0/user/channels'
  })
}
/*
获取所有频道接口
*/
export const getAllChannelAPI = () => {
  return request({
    url: '/v1_0/channels'
  })
}
/*
更新频道接口
*/
export const updateChannelAPI = ({ channels }) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PUT',
    data: {
      channels // 用户已选整个频道数组
    }
  })
}
/*
删除频道接口
*/
export const removeChannelAPI = ({ channelId }) => {
  return request({
    url: `/v1_0/user/channels/${channelId}`,
    method: 'DELETE'
  })
}

/*
获取文章列表接口
*/
export const getAllArticleAPI = ({ channel_id, timestamp }) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id,
      timestamp
    }
  })
}
/*
反馈不喜欢文章接口
*/
export const dislikeArticleAPI = ({ artId }) => request({
  url: '/v1_0/article/dislikes',
  method: 'POST',
  data: {
    target: artId
  }
})
/*
举报文章接口
*/
export const reportArticleAPI = ({ artId, type }) => {
  return request({
    url: '',
    method: '',
    data: {
      target: artId,
      type: type,
      remark: '如果你想写，可以在逻辑页面判断，如果点击类型是0，再给一个弹出框输入其他问题，传参到这里'

    }
  })
}
/*
搜索联想建议接口
*/
export const searchSuggestionAPI = ({ keyword }) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q: keyword
    }
  })
}
/*
搜索结果列表接口
*/
export const searchResultAPI = ({ page = 1, per_page = 10, q }) => {
  return request({
    url: '/v1_0/search',
    params: {
      page,
      per_page,
      q
    }
  })
}
