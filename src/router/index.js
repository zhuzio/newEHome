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
  ]
})
