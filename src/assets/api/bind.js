import axios from '../api/request.js'
const baseUrl = process.env.BASE_API
const urls = {
  details: '/app/express_server/get_express'
}

// 合并请求链接
const apis = Object.keys(urls)
  .reduce((acc, url) => {
    acc[url] = baseUrl + urls[url]
    return acc
  }, {})
// 获取信息
export const getDetail = (expressId) => {
  return axios({
    url: apis.details,
    method: 'get',
    params: axios.getData({ expressId })
  })
}
