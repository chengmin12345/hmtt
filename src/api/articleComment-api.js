import request from '@/utils/request.js'
/*
获取文章评论列表接口
*/
export const getCommentListAPI = ({ id, offset = null, limit = 10 }) => {
  return request({
    url: '/v1_0/comments',
    params: {
      type: 'a',
      source: id,
      offset,
      limit
    }
  })
}
/*
  点赞文章评论接口
  */
export const likeCommentAPI = ({ comId }) => {
  return request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
      target: comId
    }
  })
}
/*
  取消点赞文章评论接口
  */
export const dislikeCommentAPI = ({ comId }) => {
  return request({
    url: `/v1_0/comment/likings/${comId}`,
    method: 'DELETE'
  })
}
/*
  增加文章评论接口
  */
export const sendArtCommentAPI = ({ id, content, art_id = null }) => {
  const obj = {
    target: id,
    content
  }
  if (art_id !== null) {
    obj.art_id = art_id
  }
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data: obj
  })
}
