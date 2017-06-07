import axios from 'axios'
import config from './api-config'
import qs from 'qs'
// import { cookie } from 'vux'

// axios.defaults.baseURL = '/index.php'
// axios.interceptors.request.use(config => {
//   if (config.url === '/Index/Api/GetToken') {
//     return config
//   }
//   if (cookie.get('TOKEN')) {
//     config.headers.SECRET = cookie.get('TOKEN')
//     return config
//   } else {
//     axios.get('/Index/Api/GetToken').then(response => {
//       config.headers.SECRET = response.data.secret
//       cookie.set('TOKEN', response.data.secret, {
//         expires: new Date(response.data.expire_time * 1000)
//       })
//       return config
//     })
//   }
// }, error => {
//   return Promise.reject(error)
// })

const baseUrl = {
  dev: 'http://localhost',
  prod: 'http://time.superxu.cc'
}
axios.defaults.baseURL = baseUrl.dev

axios.interceptors.response.use(response => {
  return response
}, error => {
  // 把错误信息扶正, 后面就不需要写 catch了
  return Promise.resolve(error.response)
})

// 验证请求状态
function checkStatus (response) {
  if (response.status === 200 || response.status === 304) {
    return response
  }
  return {
    data: {
      code: -400,
      message: response.statusText,
      data: ''
    }
  }
}

// 验证返回code
function checkCode (res) {
  // if (res.data.code !== 200) {
  //   Vue.$vux.toast.show({
  //     text: '请求失败',
  //     position: 'middle',
  //     type: 'text',
  //     width: 'auto'
  //   })
  // }
  return res
}

// post请求
export default {
  post (url, data) {
    return axios({
      method: 'post',
      url: url,
      data: qs.stringify(data),
      timeout: config.timeout,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(checkStatus).then(checkCode)
  },
  get (url, params) {
    return axios({
      method: 'get',
      url: url,
      params,
      timeout: config.timeout,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(checkStatus).then(checkCode)
  }
}
