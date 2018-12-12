import axios from '../api/request.js'
const baseUrl = process.env.BASE_API
const urls = {
  details: '/app/express_server/get_express.htm',
  bind: '/app/express_server/bind_express.htm?WX_TYPE=OfficialAccount'
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
// 获取信息
export const bindHandler = (param) => {
  return axios({
    url: apis.bind,
    method: 'post',
    data: axios.postData(param)
  })
}
