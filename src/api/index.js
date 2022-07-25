import axios from '@/utils/request.js'
export const getAllAPI = () => {
  return axios({
    url: '/v1_0/channels',
    method: 'GET'

  })
}
