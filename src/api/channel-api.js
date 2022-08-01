import request from '@/utils/request.js'
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
