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
            <div class="user-code"  @click="CLink(0)"></div>
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
         <!-- <router-link to="/upgrade">
            <div><i class="icon icon-about"></i>升级<i class="icon icon-right fr"></i></div>
          </router-link>-->
          <router-link to="/installmentBill" v-if="show"><div><i class="icon icon-address"></i>分期账单<i class="icon icon-right fr"></i></div></router-link>
          <div @click="borrow"><i class="icon icon-borrowing"></i>代理费分期<i class="icon icon-right fr"></i></div>
          <router-link to="/addressManage/0"><div><i class="icon icon-address"></i>收货地址<i class="icon icon-right fr"></i></div></router-link>
          <router-link to="/aboutUs"><div><i class="icon icon-about"></i>关于我们<i class="icon icon-right fr"></i></div></router-link>
        </div>
      </div>
      <tabFoot></tabFoot>
      <div class="regCode" v-if="link" @click="CLink(1)">
        <img :src="src" alt="">
      </div>
      <mt-popup v-model="popBorrowing" class="borrowing-pop" position="bottom">
        <div class="borrowing-pop-container">
          <div class="borrowing-pay-way">
            <div class="borrowing-pay-list" @click="firstInstallment(0)">
              <div class="borrowing-each-pay"><i class="icon icon-pay-weChat"></i><span>微信支付</span></div>
            </div>
          </div>
        </div>
      </mt-popup>
    </div>
</template>

<script>
  import tabFoot from '../comp/tabFoot.vue'
  import api from '@/assets/js/api.js'
  import { Toast } from 'mint-ui'
  import { MessageBox } from 'mint-ui'
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
        idDeg:'',
        src:'',
        link: false,
        c_b: false,
        msg: '',
        borrowQualification: false,
        show: false,
        popBorrowing: false,
        borrowingPayWay: '',
        borrowingPayWayId: ''
      }
    },
    methods: {
      borrow () {
        api.qualificationBorrow()
          .then(res => {
            if (res.code !== 200) {
             if (res.code === 500) {
               Toast(res.msg);
               return false
             };
             if (res.code === 501) {
               MessageBox({
                 title: '提示',
                 message: '您有未支付的分期订单，是否去支付？',
                 showCancelButton: true
               })
                 .then(rest => {
                   if (rest == 'confirm') {
                     console.log(res)
                     this.borrowingPayWayId = res.data.id;
                     this.popBorrowing = true;
                   } else {
                     return false;
                   }
                 })
             }
            } else {
              this.$router.push('/borrowing');
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      CLink (idx) {
        switch (idx) {
          case 0:
            this.link = true;
            break;
          case 1:
            this.link = false;
            break;
          default:
            return false;
        }
      },
      firstInstallment (idx) {
        switch (idx) {
          case 0:
            this.borrowingPayWay = 'wx';
            break;
          case 1:
            this.borrowingPayWay = 'unionpay';
            break;
          default:
            return false;
        };
        let form = this.$qs.stringify({
          token: token,
          loan_id: this.borrowingPayWayId,
          pay_channel: this.borrowingPayWay
        })
        api.firstInstallmentPayAgain (form)
          .then(res => {
            console.log(res)
            if (res.code === 200) {
              window.location.href = 'http://www.xinyijiamall.com/api/applyloan/OrderPay?order_sn='+ res.data +'';
            } else {
              this.popBorrowing = false;
              Toast(res.msg);
              return false
            }
          })
          .catch(err => {
            console.log(err)
          })

      }
    },
    created () {
      if (!token) {
        window.location.href = '/#/login'
      } else {
        api.getUserInfo()
          .then(res => {
            this.userInfo = res.data;
            if (this.userInfo.level > 0) {
              this.show = true
            };
            switch (parseInt(this.userInfo.account_type)) {
              case 1:
                this.idDeg = '会员';
                break;
              case 2:
                this.idDeg = '代理';
                break;
              case 3:
                this.idDeg = '总代';
                break;
              case 4:
                this.idDeg = '总监';
                break;
              case 5:
                this.idDeg = '联创';
                break;
              case 6:
                this.idDeg = '合伙人';
                break;
              case 7:
                this.idDeg = '股东';
                break;
            };
          })
          .catch(err => {
            console.log(err)
          })
        localStorage.removeItem('borrow');
        localStorage.removeItem('borrowLeave');
        this.src = 'http://www.xinyijiamall.com/api/registerLink?token='+token+'';
      }
    },
  }
</script>

<style scoped lang="less">
 @import "../../assets/less/my.less";
</style>
