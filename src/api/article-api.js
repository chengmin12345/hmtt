import request from '@/utils/request.js'
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
  文章详情接口
  */
export const articleDetailAPI = ({ artId }) => {
  return request({
    url: `/v1_0/articles/${artId}`
  })
}
/*
  文章点赞接口
  */
export const likingsAPI = ({ artId }) => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target: artId
    }
  })
}
/*
  文章取消点赞接口
  */
export const dislikeAPI = ({ artId }) => {
  return request({
    url: `/v1_0/article/likings/${artId}`,
    method: 'DELETE'
  })
}
/*
文章收藏列表接口
*/
export const collectArtListAPI = ({ page = 1, per_page = 10 }) => {
  return request({
    url: '/v1_0/article/collections',
    params: {
      page: page,
      per_page: per_page
    }
  })
}
/*
  收藏文章接口
  */
export const collectArtAPI = ({ artId }) => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target: artId
    }
  })
}
/*
  取消收藏文章接口
  */
export const unCollectArtAPI = ({ artId }) => {
  return request({
    url: `/v1_0/article/collections/${artId}`,
    method: 'DELETE'
  })
}
/*
  关注作者接口
  */
export const followedAPI = ({ userId }) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target: userId
    }
  })
}
/*
  取关作者接口
  */
export const unfollowedAPI = ({ userId }) => {
  return request({
    url: `/v1_0/user/followings/${userId}`,
    method: 'DELETE'
  })
}
