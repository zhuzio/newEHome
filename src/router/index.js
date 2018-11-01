import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/store/index'
import classify from '@/components/store/classify'
import shopCar from '@/components/store/shopCar'
import my from '@/components/my/my'
import set from '@/components/my/set'
import detail from '@/components/store/detail'
import confirmOrder from '@/components/store/confirmOrder'
import apply from '@/components/store/apply'
import login from '@/components/login/login'
import register from '@/components/register/register'
import assets from '@/components/system/assets'
import integralDetailList from '@/components/system/integralDetailList'
import shopIntegral from '@/components/system/shopIntegral'
import useable from '@/components/system/useable'
import withdraw from '@/components/system/withdraw'
import withdrawRecord from '@/components/system/withdrawRecord'
import banKManage from '@/components/my/banKManage'
import addBankCard from '@/components/my/addBankCard'
import addressManage from '@/components/my/addressManage'
import addAddress from '@/components/my/addAddress'
import earnings from '@/components/system/earnings'
import teams from '@/components/my/teams'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/',
      redirect: 'index'
    },
    {
      path: '/index',
      name: 'index',
      meta: { requiresAuth: true },
      component: index
    },
    {
      path: '/login', // 登录
      name: 'login',
      component: login
    },
    {
      path: '/register', // 注册
      name: 'register',
      component: register
    },
    {
      path: '/classify', // 分类
      name: 'classify',
      component: classify
    },
    {
      path: '/shopCar', // 购物车
      name: 'shopCar',
      component: shopCar
    },
    {
      path: '/my', // 我的
      name: 'my',
      component: my
    },
    {
      path: '/detail', // 商品详情
      name: 'detail',
      component: detail
    },
    {
      path: '/confirmOrder', // 确认订单
      name: 'confirmOrder',
      component: confirmOrder
    },
    {
      path: '/apply', // 支付方式选择
      name: 'apply',
      component: apply
    },
    {
      path: '/set', // 设置
      name: 'set',
      component: set
    },
    {
      path: '/assets', // 资产
      name: 'assets',
      component: assets
    },
    {
      path: '/integralDetailList/:m/:t', // 每月转化列表
      name: 'integralDetailList',
      component: integralDetailList
    },
    {
      path: '/shopIntegral/:num', // 购物积分
      name: 'shopIntegral',
      component: shopIntegral
    },
    {
      path: '/useable/:num', // 可用积分
      name: 'useable',
      component: useable
    },
    {
      path: '/withdraw', // 提现
      name: 'withdraw',
      component: withdraw
    },
    {
      path: '/withdrawRecord', // 提现记录
      name: 'withdrawRecord',
      component: withdrawRecord
    },
    {
      path: '/banKManage/:id', // 银行卡管理
      name: 'banKManage',
      component: banKManage
    },
    {
      path: '/addBankCard', // 添加银行卡
      name: 'addBankCard',
      component: addBankCard
    },
    {
      path: '/addressManage', // 地址管理
      name: 'addressManage',
      component: addressManage
    },
    {
      path: '/addAddress/:id', // 添加收货地址
      name: 'addAddress',
      component: addAddress
    },
    {
      path: '/earnings', // 我的收益
      name: 'earnings',
      component: earnings
    },
    {
      path: '/teams', // 我的团队
      name: 'teams',
      component: teams
    },
  ]
})
