import axios from '../api/request.js'
const baseUrl = process.env.BASE_API
const urls = {
  order: '/app/express_server/history_order.htm'
}

// 合并请求链接
const apis = Object.keys(urls)
  .reduce((acc, url) => {
    acc[url] = baseUrl + urls[url]
    return acc
  }, {})
// 获取统计
export const getOrder = (opr, id) => {
  return axios({
    url: apis.order,
    method: 'get',
    params: axios.getData({ opr, id })
  })
}
