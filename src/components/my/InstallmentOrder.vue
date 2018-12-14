<template>
  <div class="wrapper">
    <div class="moduleHead">
      <a href="javascript:window.history.go(-1)"></a>分期支付订单
    </div>
    <div class="installment-order-container">
      <div class="ioc-head">
        <h1><span>¥</span>{{bills.money}}</h1>
        <p>第 {{bills.idx}} 期分期订单</p>
      </div>
      <div class="ioc-pay">
        <div class="ioc-pay-list">
          <p><i class="icon icon-pay-weChat"></i><span>微信支付</span></p>
          <div>
            <input type="checkbox" id="pay" value="wx" v-model="payWay">
            <label for="pay"></label>
          </div>
        </div>
      </div>
      <button @click="installmentPay">立即还款</button>
    </div>
  </div>
</template>

<script>
  import api from '@/assets/js/api.js'
  import { Toast } from 'mint-ui'
  let token = localStorage.getItem('token')
  export default {
    name: "installment-order",
    data () {
      return {
        bills:[],
        payWay:''
      }
    },
    created () {
      this.bills = JSON.parse(localStorage.getItem('bill'));
    },
    methods: {
      installmentPay () {
        if (!this.payWay) {
          Toast('请选择支付方式！！！');
          return false;
        };
        let form = this.$qs.stringify({
          token: token,
          stag_id: this.bills.id,
          pay_channel: 'wx'
        })
        api.createdInstallmentOrder(form)
          .then(res => {
            if (res.code === 200) {
              window.location.href = 'http://www.xinyijiamall.com/api/stag/OrderPay?order_sn='+ res.data +'';
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
      }
    }
  }
</script>

<style scoped lang="less">
  .installment-order-container{
    width: 100%;
    height: auto;
    margin: .8rem auto 0;
    padding-bottom: 1rem;
    background: white;
    .ioc-head{
      width: 100%;
      height: 3.84rem;
      background: white;
      border-top: 1px #b7b7b7 solid;
      border-bottom: 1px rgba(183, 183, 183, 0.21) solid;
      text-align: center;
      h1{
        color: #f64243;
        margin-top: 1.1rem;
        font-size: .9rem;
        span{
          font-size: .5rem;
          margin-right: .1rem;
        }
      }
      p{
        font-size: 0.22rem;
        color: #5f5f5f;
      }
    }
    .ioc-pay{
      width: 100%;
      .ioc-pay-list{
        width: 5.308rem;
        padding: .2rem 0;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: .24rem;
        color: black;
        *{
          vertical-align: middle;
        }
        p{
          span{
            margin-left: .1rem;
          }
        }
      }
    }
    button{
      display: block;
      margin: 2.5rem auto 0;
      width: 5.308rem;
      height: 0.734rem;
      background-color: #f64344;
      font-size: 0.27rem;
      color: white;
    }
    input[type='radio']+label::before,
    input[type='checkbox']+label::before {
      width:0.35rem;
      height:0.35rem;
      line-height: 0.35rem;
      border: 1px #ccc solid;
    }
    input[type='radio']:checked+label::before,
    input[type='checkbox']:checked+label::before{
      color: #fff;/*对号的颜色*/
      background: #f64243;
      border: 1px rgba(204, 204, 204, 0.21) solid;
      font-size: .2rem;
      text-align: center;
    }
    label{
      color: black;
    }
  }
</style>
