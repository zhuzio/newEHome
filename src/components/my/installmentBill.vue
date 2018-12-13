<template>
  <div class="wrapper">
    <div class="moduleHead moduleHeadWhite">
      <a href="javascript:window.history.go(-1)"></a>分期账单
    </div>
    <div class="section">
      <div class="title">
        <span></span><i>全部账单</i>
      </div>
      <div class="bill-container">
        <div class="bill-detail" v-for="(bill, index) in billList" :key="index" :class="{'bill-now':index === idx, 'bill-next': bill.is_repay == 0}" @click="goPay(bill, index)">
          <div class="bill-info">
            <p>
              <span class="bill-frequency">第<i>{{bill.number}}</i>期</span>
              <span class="bill-money">金额：<i>{{bill.money}}</i> 元</span>
            </p>
            <p>
              <span class="bill-time" v-if="bill.is_overdue == 0">账单还款日趋截至为 <i>{{bill.repayment_date}}</i></span>
              <span class="bill-time" v-if="bill.is_overdue == 1">您的账单已逾期 <i style="color: #44ec1d;font-size: .3rem">{{bill.overdue_day}}</i> 天，请尽快还款</span>
              <span class="bill-code bill-code-green" v-if="bill.is_repay == 1 && bill.is_overdue == 0">已还款</span>
              <span class="bill-code bill-code-red" v-if="bill.is_repay == 0 && bill.is_overdue == 0">未还款</span>
              <span class="bill-code bill-code-red" v-if="bill.is_repay == 0 && bill.is_overdue == 1">已逾期</span>
            </p>
          </div>
          <div class="icon-arrow"><i class="icon icon-right" v-if="bill.is_repay == 0"></i></div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import api from '@/assets/js/api.js'
  import { Toast } from 'mint-ui'
  export default {
    name: "installment-bill",
    data () {
      return {
        billList: [],
        havePay:[],
        idx: 0
      }
    },
    created () {
      localStorage.removeItem('bill');
      api.installmentBill()
        .then(res => {
          if (res.code === 200) {
            res.data.forEach(list => {
              if (list.is_repay == 1) {
                this.havePay.push(list)
              };
              this.billList.push(list)
            });
            this.idx = this.havePay.length;
          }
        })
    },
    methods: {
      goPay (ele, idx) {
        let ix = this.idx+1;
        if(idx === this.idx) {
          let installment = {
            idx: ix,
            id: ele.id,
            money: ele.money,
            time: ele.repayment_date,
            overdueDay: ele.overdue_day
          };
          let over = ele.is_overdue;
          localStorage.setItem('bill', JSON.stringify(installment));
          if (over === 0) {
            this.$router.push('/installmentOrder');
          } else {
            this.$router.push('/overdueBill');
          }
        } else if(idx < this.idx){
          Toast('去还第'+ix+'期吧，本期已经还过了~');
          return false;
        } else {
          Toast('请先还第'+ix+'期！！！');
          return false;
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/installmentBill";
</style>
