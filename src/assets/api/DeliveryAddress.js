import axios from '../api/request.js'
const baseUrl = process.env.BASE_API
const urls = {
  lists: '/app/express_server/list.htm'
}

// 合并请求链接
const apis = Object.keys(urls)
  .reduce((acc, url) => {
    acc[url] = baseUrl + urls[url]
    return acc
  }, {})
// 获取列表
export const getLists = (status, pageNumber) => {
  return axios({
    url: apis.lists,
    method: 'get',
    params: axios.getData({ halfDateType: status, pageNumber: pageNumber })
  })
}

