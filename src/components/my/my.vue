<template>
    <div class="wrapper">
      <div class="my-head-container">
        <div class="my-head">
          <p class="my-set-msg">
            <router-link to="/set"><i class="icon icon-set"></i></router-link>
            <i class="icon icon-msg"></i>
          </p>
          <div class="head-center">
            <div class="user-head-img">
              <img src="../../assets/images/head.png" alt="">
            </div>
            <div class="user-info">
              <p class="user-info-name">{{userInfo.realname}}</p>
              <p class="user-info-deg">身份：{{idDeg}}</p>
            </div>
            <div class="user-code"></div>
            <div class="user-big-code"></div>
          </div>
        </div>
        <div class="my-order-treasure">
          <p class="my-order-treasure-title">订单/资产</p>
          <ul>
            <router-link to="/assets">
              <li>
                <i class="icon icon-treasure"></i>
                <p>资产</p>
              </li>
            </router-link>
            <router-link to="/earnings">
              <li>
                <i class="icon icon-earnings"></i>
                <p>收益</p>
              </li>
            </router-link>
            <router-link to="/teams">
              <li>
                <i class="icon icon-team"></i>
                <p>团队</p>
              </li>
            </router-link>
            <router-link to="/order">
              <li>
                <i class="icon icon-order"></i>
                <p>订单</p>
              </li>
            </router-link>
          </ul>
        </div>
        <div class="my-order-treasure">
          <p class="my-order-treasure-title">服务</p>
          <router-link to="/borrowing"><div><i class="icon icon-borrowing"></i>借款<i class="icon icon-right fr"></i></div></router-link>
          <router-link to="/addressManage"><div><i class="icon icon-address"></i>收货地址<i class="icon icon-right fr"></i></div></router-link>
          <div><i class="icon icon-about"></i>关于我们<i class="icon icon-right fr"></i></div>
        </div>
      </div>
      <tabFoot></tabFoot>
    </div>
</template>

<script>
  import tabFoot from '../comp/tabFoot.vue'
  import api from '@/assets/js/api.js'
  let token = localStorage.getItem('token')
  export default {
    name: "my",
    components: {
      tabFoot
    },
    data () {
      return {
        userInfo:[],
        username:'',
        idDeg:''
      }
    },
    created () {
      if (!token) {
        window.location.href = '/#/login'
      } else {
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
        switch (parseInt(this.userInfo.account_type)) {
          case 1:
            this.idDeg = '代理';
            break;
          case 2:
            this.idDeg = '区代';
            break;
          case 3:
            this.idDeg = '总代';
            break;
          case 4:
            this.idDeg = '联创';
            break;
          case 5:
            this.idDeg = '合伙人';
            break;
        }
      }
    },

  }
</script>

<style scoped lang="less">
 @import "../../assets/less/my.less";
</style>
