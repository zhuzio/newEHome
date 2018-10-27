<template>
  <div class="wrapper">
    <div class="moduleHead">
      <a href="javascript:window.history.go(-1)"></a>提现
    </div>
    <div class="wd-container">
      <div class="wd-chose-card">
        <div class="wd-c-img"><img src="../../assets/images/jsbank.png" alt=""></div>
        <div class="wd-c-info">
          <p class="c-name">建设银行</p>
          <p class="c-num">6217****0025</p>
        </div>
        <div class="wd-c-back"><i class="icon icon-right"></i></div>
      </div>
      <div class="wd-center">
        <p class="wd-count">提现金额（手续费10%，剩余次数<span>{{withdrawCount}}</span>次）</p>
        <div class="wd-num">
          <span>¥</span>
          <input type="number" placeholder="0" v-model="withdrawNum">
        </div>
        <p class="wd-balance">余额<span>{{balance}}</span>积分</p>
      </div>
      <button class="wd-btn" @click='withdraw'>预计48小时到账，确认提现</button>
    </div>
  </div>
</template>

<script>
  import api from '@/assets/js/api.js'
  import { Toast } from 'mint-ui'
  import { MessageBox } from 'mint-ui'
  export default {
    name: "withdraw",
    data () {
      return {
        withdrawCount:10,
        withdrawNum: '',
        balance: '3000.00'
      };
    },
    methods: {
      withdraw () {
        if (this.withdrawCount == 0) {
          Toast('暂无提现次数！');
          return false;
        };
        if (!this.withdrawNum) {
          Toast('提现金额不能为空！');
          return false;
        };
        if (parseInt(this.withdrawNum) > parseInt(this.balance)) {
          Toast('提现金额不能大于余额！');
          return false;
        };
      }
    },
    created () {
      api.availableIntegral()
        .then(res => {
          if (res.code === 200) {
            this.balance = res.data.ready_points
          } else {
            Toast(res.msg);
          }
        })
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/withdraw";
</style>
