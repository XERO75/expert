import axios from '../api/request.js'
const baseUrl = process.env.BASE_API
const urls = {
  statistics: '/app/express_server/daily_item.htm'
}

// 合并请求链接
const apis = Object.keys(urls)
  .reduce((acc, url) => {
    acc[url] = baseUrl + urls[url]
    return acc
  }, {})
// 获取统计
export const getStatistics = (halfDateType) => {
  return axios({
    url: apis.statistics,
    method: 'get',
    params: axios.getData({ halfDateType })
  })
}
// // 变更状态
// export const changeStatus = (param) => {
//   return axios({
//     url: apis.change,
//     method: 'post',
//     data: axios.postData(param)
//   })
// }
