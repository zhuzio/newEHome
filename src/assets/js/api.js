import axios from 'axios'
import { Toast } from 'mint-ui'

var url = 'http://appliance.test/api/'
var imgUrl = 'http://img.nyycstar.com/'
let token = localStorage.getItem('token')
// axios 配置
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.baseURL = url

export function Post (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        if (response.data.code === 200) {
          resolve(response.data)
        } else if (response.data.code === 403) {
          Toast({
            message: '您在已经在其他地方登录，请重新登录',
            position: 'bottom',
            duration: 2000
          })
        } else {
          Toast({
            message: response.data.msg
          })
        }
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export function Get (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, params)
      .then(response => {
        if (response.data.code === 200 || response.data.code === 500) {
          resolve(response.data)
        } else if (response.data.code === 403) {
          Toast({
            message: '您在已经在其他地方登录，请重新登录',
            position: 'bottom',
            duration: 2000
          })
        } else {
          Toast({
            message: response.data.msg
          })
        }
      }, err => {
        reject(err)
        Toast({
          message: '网络延时，请稍后重试'
        })
      })
      .catch((error) => {
        reject(error)
        Toast({
          message: '网络延时，请稍后重试'
        })
      })
  })
}

export default {
  register (params) {
    // 注册
    return Post(`/register`, params)
  },
  login (params) {
    // 登录
    return Post( `/login?phone=${params.account}&password=${params.password}`)
  },
  availableIntegral () {
    // 获得用户积分资产: 总积分 可用积分 购物积分
    return Get(`/availablePoints?token=${token}`)
  },
  haveConversionIntegral (params) {
    // 获得用户已转化积分
    return Get(`/alreadyGetMonth/${params}?token=${token}`)
  },
  haveConversionIntegralDay (params) {
    // 获得用户已转化积分每天详情
    return Get(`/alreadyGetDay?token=${token}&times=${params}`)
  },
  shopIntegral (params) {
    // 获得用户已转化积分每天详情
    return Get(`/MoneyPointsExpenses/1?token=${token}`)
  },
  useAbleIntegral (params) {
    // 获得用户可用积分支出列表
    return Get(`/ReadyPointsExpenses/1?token=${token}`)
  },
  swipe () {
    // 首页轮播图
    return Get(`/slides`)
  }
}
export { imgUrl }
