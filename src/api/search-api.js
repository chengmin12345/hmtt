import request from '@/utils/request.js'
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
