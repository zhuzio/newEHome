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
    </div>
</template>

<script>
  import api from '@/assets/js/api.js'
  import { Toast } from 'mint-ui'
  let token = localStorage.getItem('token')
  export default {
    name: "overdue-bill",
    data () {
      return {
        overdue: []
      }
    },
    created () {
      this.overdue = JSON.parse(localStorage.getItem('bill'));
    },
    methods: {
      overduePay () {
        let form = this.$qs.stringify({
          token: token,
          stag_id: this.overdue.id,
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
  @import "../../assets/less/overDue";
</style>
