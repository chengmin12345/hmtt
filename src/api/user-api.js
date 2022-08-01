import request from '@/utils/request.js'
/*
获取用户基本接口(我的页面显示)
*/
export const getUserInfoAPI = () => {
  return request({
    url: '/v1_0/user'
  })
}
/*
  获取用户个人简介接口（编辑页面显示）
  */
export const getUserIntroductionAPI = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}
/*
  更新用户头像接口
  */
export const updataUserImgAPI = (fd) => {
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: fd
  })
}
/*
  更新用户基本信息接口
  */
export const updateUserInfoAPI = (obj) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: obj
  })
}
