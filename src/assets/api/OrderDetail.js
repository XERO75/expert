import axios from '../api/request.js'
const baseUrl = process.env.BASE_API
const urls = {
  details: '/app/express_server/order_detail.htm',
  change: '/app/order/express_edit.htm?WX_TYPE=OfficialAccount'
}

// 合并请求链接
const apis = Object.keys(urls)
  .reduce((acc, url) => {
    acc[url] = baseUrl + urls[url]
    return acc
  }, {})
// 获取订单信息
export const getDetails = (sn) => {
  return axios({
    url: apis.details,
    method: 'get',
    params: axios.getData({ sn: sn })
  })
}
// 变更状态
export const changeStatus = (param) => {
  return axios({
    url: apis.change,
    method: 'post',
    data: axios.postData(param)
  })
}
// export const changeStatus = (sn, orderStatus) => {
//   return axios({
//     url: apis.change,
//     method: 'get',
//     params: axios.getData({ sn: sn, orderStatus: orderStatus })
//   })
// }
// 确认接受订单
// export const acceptOrder = (param) => {
//   return axios({
//     url: apis.accept,
//     method: 'post',
//     data: axios.postData(param)
//   });
// };

