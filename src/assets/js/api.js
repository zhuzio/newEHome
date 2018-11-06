import axios from 'axios'
import { Toast } from 'mint-ui'

var url = 'http://www.xinyijiamall.com/api/'
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
    // 获得用户已转化积分(每月)
    return Get(`/alreadyGetMonth/${params}?token=${token}`)
  },
  haveConversionIntegralDay (params) {
    // 获得用户已转化积分每天详情
    return Get(`/alreadyGetDay?token=${token}&times=${params}`)
  },
  shopIntegral (params) {
    // 获得用户购物积分支出按 月 统计
    return Get(`/MoneyPointsMonthExpenses/1?token=${token}`)
  },
  shopIntegralDay (params) {
    // 获得用户购物积分支出按 天 统计
    return Get(`/MoneyPointsDayExpenses?token=${token}&times=${params}`)
  },
  useAbleIntegral (params) {
    // 获得用户可用积分支出列表
    return Get(`/ReadyPointsExpenses/1?token=${token}`)
  },
  withdrawApply (params) {
    // 提现申请
    return Post(`/applyWithdraw`, params)
  },
  withdrawRecord (params) {
    // 提现申请记录
    return Get(`/withdrawList/1?token=${token}`)
  },
  getBankInfo () {
    // 获得银行信息
    return Get(`/banksList`)
  },
  getBankInfoPro (params) {
    // 获得开户省份
    return Get(`/bankProvince?bank=${params}`)
  },
  getBankInfoCity (params) {
    // 获得开户城市
    return Get(`/bankCity?bank=${params.bank}&province=${params.pro}`)
  },
  getBankInfoDis (params) {
    // 获得开户支行
    return Get(`/bankCodeList?bank=${params.bank}&province=${params.pro}&area=${params.dis}`)
  },
  addBank (params) {
    // 添加银行卡
    return Post(`/addBankCard`,params)
  },
  getBankCard () {
    // 获得用户银行卡信息
    return Get(`/getBankcard?token=${token}`)
  },
  delCard (params){
    // 删除银行卡
    return Post(`/delBank`, params)
  },
  getDefaultCard () {
    // 获得用户默认银行卡
    return Get(`getBankDefault?token=${token}`)
  },
  getAddress () {
    // 获得用户收货地址
    return Get(`myAddress/1?token=${token}`)
  },
  getAddressPCA (params) {
    // 获得省市县
    return Get(`city/${params}`)
  },
  addAddress (params) {
    // 新增收货地址
    return Post(`/adressAdd`, params)
  },
  setDefAddress (params) {
    // 设置默认地址
    return Post(`/setDefault`, params)
  },
  deleteAddress (params) {
    // 删除地址
    return Post(`/delMyAddress`, params)
  },
  editAddress (params) {
    // 编辑地址
    return Post(`/addressEdit`, params)
  },
  getDefaultAddress () {
    // 获得用户默认收货地址
    return Get(`/getDefaultAddress?token=${token}`)
  },
  swipe () {
    // 首页轮播图
    return Get(`/slides`)
  },
  getEarningsFrozen (params) {
    // 获得用户收益
    return Get(`/profit/${params}?token=${token}`)
  },
  getEarnings (params) {
    // 获得用户收益
    return Get(`/profitConversion/${params}?token=${token}`)
  },
  getTeams (params) {
    // 获得用户收益
    return Get(`/relation/recommend/${params}?token=${token}`)
  },
  getZone (params) {
    // 获得不同专区的商品
    return Get(`/productTypeList/${params.page}?type=${params.type}`)
  },
  getGoodsDetail (params) {
    // 获得商品详情
    return Get(`/goodsInfo?product_id=${params}`)
  },
  addShopCar (params) {
    // 加入购物车
    return Post(`/addToCart`, params)
  },
  getShopCarNum () {
    // 获得购物车数量
    return Get(`/numCart?token=${token}`)
  },
  shopCarDelete (params) {
    // 删除购物车
    return Post(`/deleteFromCart`, params)
  },
  getCarList (params) {
    // 获得购物车列表
    return Get(`cartList/${params}?token=${token}`)
  },
  createdOrder (params) {
    // 生成订单
    return Post(`/createOrder`, params);
  },
  orderPay (params) {
    // 订单支付
    return Get(`OrderPay?order_sn=${params.sn}&payment_password=${params.psd}`)
  },
  orderCancel (params) {
    // 取消订单
    return Post(`/cancelOrder`, params);
  },
  getOrderData (params) {
    // 获取商城订单列表数据
    return Get(`/orderget/${params.page}?token=${token}&status=${params.stu}`)
  },
  borrowQualification () {
    // 获得用户是否有贷款资格
    return Get(`qualifications?token=${token}`)
  },
  borrowIt (params) {
    // 借款申请
    return Post(`/applyLoan`, params);
  }
}
export { imgUrl }
