import axios from '../api/request.js'
const baseUrl = process.env.BASE_API
const urls = {
  person: '/app/express_server/express_info.htm',
  unBind: '/app/express_server/unbind_express.htm',
  comment: '/app/express_server/comment_list.htm'
  // change: '/app/order/express_edit.htm?WX_TYPE=OfficialAccount'
}

// 合并请求链接
const apis = Object.keys(urls)
  .reduce((acc, url) => {
    acc[url] = baseUrl + urls[url]
    return acc
  }, {})
// 获取信息
export const getPerson = () => {
  return axios({
    url: apis.person,
    method: 'get',
    params: axios.getData({})
  })
}
// 解绑
export const unBindHandler = () => {
  return axios({
    url: apis.unBind,
    method: 'get',
    params: axios.getData({})
  })
}
// comment
export const getComment = () => {
  return axios({
    url: apis.comment,
    method: 'get',
    params: axios.getData({})
  })
}
// 变更状态
// export const changeStatus = (param) => {
//   return axios({
//     url: apis.change,
//     method: 'post',
//     data: axios.postData(param)
//   })
// }
