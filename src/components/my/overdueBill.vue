<template>
    <div class="wrapper">
      <div class="moduleHead moduleHeadWhite">
        <a href="javascript:window.history.go(-1)"></a><span>逾期账单</span>
      </div>
      <div class="overdue-container">
        <div class="due-center">
          <p class="due-time">您在<i>{{overdue.time}}</i>的账单应还款：</p>
          <p class="due-money">{{overdue.money}}</p>
          <p class="due-day">现已逾期{{overdue.overdueDay}}天</p>
          <button class="due-button" @click="overduePay">立即还款</button>
        </div>
      </div>
      <div class="overdue-pay-way-choice" v-if="payChoice">
          <div class="overdue-pay-way-center">
            <p class="overdue-pay-title">请选择支付方式</p>
            <div class="overdue-pay-way">
              <input type="radio" id="oPWX" name="overDuePay" v-model="payway" value="wx">
              <label for="oPWX"><i class="icon icon-pay-weChat"></i>微信支付</label>
            </div>
            <div class="overdue-pay-way">
              <input type="radio" id="oPKJ" name="overDuePay" v-model="payway" value="ready_points">
              <label for="oPKJ"><i class="icon icon-pay-integral-y"></i>可用积分支付</label>
            </div>
            <div class="overdue-pay-btn">
              <button @click="overdueWayPay">确定支付</button>
            </div>
          </div>
      </div>
      <pay @hidden="hiddenShow"  @password="passwordGro" :password="applyPsd" v-show="payPop"></pay>
    </div>
</template>

<script>
  import api from '@/assets/js/api.js'
  import { Toast } from 'mint-ui'
  import pay from '../comp/pay.vue'
import { truncate } from 'fs';
  let token = localStorage.getItem('token')
  export default {
    name: "overdue-bill",
    data () {
      return {
        overdue: [],
        payway: '',
        payPop: false,
        applyPsd: '',
        orderSn: '',
        payChoice: false
      }
    },
    components: {
      pay
    },
    created () {
      this.overdue = JSON.parse(localStorage.getItem('bill'));
    },
    methods: {
      overduePay () {
        this.payChoice = true;
      },
      overdueWayPay () {
         if (!this.payway) {
          Toast('请选择支付方式！！！');
          return false;
        };
        let form = this.$qs.stringify({
          token: token,
          stag_id: this.overdue.id,
          pay_channel: this.payway
        })
        api.createdInstallmentOrder(form)
          .then(res => {
            if (res.code === 200) {
              if (this.payway == 'wx') {
                window.location.href = 'http://www.xinyijiamall.com/api/stag/OrderPay?order_sn='+ res.data +'';
              } else {
                this.orderSn = res.data;
                this.payPop = true;
                this.payChoice = false;
              }
            } else if (res.code === 500) {
              Toast(res.msg);
              return false;
            } else {
              Toast(res.msg);
              return false;
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      hiddenShow () {
        let that = this;
        that.payPop = false
      },
      passwordGro (e) {
        this.applyPsd = e
        let psw = this.applyPsd.toString().replace(/,/g, '')
        if ( this.applyPsd.length === 6) {
          let form = this.$qs.stringify({
            order_sn: this.orderSn,
            payment_password: psw
          })
          api.createdInstallmentOrderUseableIntegral(form)
            .then(res => {
              if (res.code === 200) {
                  Toast(res.msg);
                  setTimeout(function(){
                    window.history.go(-1)
                  },1500)
                } else {
                  Toast(res.msg);
                  this.payPop = true;
                }
            })
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/overDue";
</style>
