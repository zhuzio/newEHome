import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/storeIndex/index'
import classify from '@/components/storeClassify/classify'
import shopCar from '@/components/shopCar/shopCar'
import my from '@/components/my/my'

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
  ]
})
