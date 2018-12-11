import axios from '../api/request.js'
const baseUrl = process.env.BASE_API
const urls = {
  search: '/app/express_server/search.htm'
}

// 合并请求链接
const apis = Object.keys(urls)
  .reduce((acc, url) => {
    acc[url] = baseUrl + urls[url]
    return acc
  }, {})
// 获取统计
export const getSearch = (pageNumber, searchKey) => {
  return axios({
    url: apis.search,
    method: 'get',
    params: axios.getData({ pageNumber, searchKey })
  })
}
