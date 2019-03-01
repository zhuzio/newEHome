<template>
  <div class="wrapper">
    <div class="moduleHead moduleHeadWhite">
      <a href="javascript:window.history.go(-1)"></a>可用积分
      <div class="assets-icon shop-integral-icon">
        <i class="icon icon-y-integral-white"></i>
      </div>
    </div>
    <div class="assets-container">
      <div class="assets-head shop-integral-head">
        <div class="assets-head-center">
          <p class="assets-integral-txt">总可用积分</p>
          <h1 class="assets-integral-num">{{total}} <button @click="withdraw(0)" class="assets-integral-button">提现 / 转账</button></h1>
        </div>
        <div class="assets-others">
          <p>累计使用：<span>{{haveUse}}</span></p>
        </div>
      </div>
      <div class="assets-conversion-container">
        <div class="assets-record" @click="goDetail(0)">
          <p><i class="icon icon-consumeRecord"></i><span>消费记录</span></p><i class="icon icon-right"></i>
        </div>
        <router-link to="/withdrawRecord">
          <div class="assets-record">
            <p><i class="icon icon-withdrawRecord"></i><span>提现记录</span></p><i class="icon icon-right"></i>
          </div>
        </router-link>
        <div class="assets-record" @click="withdraw(1)">
          <p><i class="icon icon-withdrawRecord"></i><span>转账记录</span></p><i class="icon icon-right"></i>
        </div>
      </div>
    </div>
    <mt-popup v-model="useablePop" class="useable-pop" position="bottom">
        <div class="useablePop-center" v-if="distincte">
          <div class="assest-integral-button-list" @click="AIWithdrawTransfer(0)">提现</div>
          <div class="assest-integral-button-list" @click="AIWithdrawTransfer(1)">转账</div>
        </div>
        <div class="useablePop-center" v-if="!distincte">
          <div class="assest-integral-button-list" @click="AIWithdrawTransferRecord(0)">转账记录--转出</div>
          <div class="assest-integral-button-list" @click="AIWithdrawTransferRecord(1)">转账记录--收入</div>
        </div>
    </mt-popup>
  </div>
</template>

<script>
  import api from '@/assets/js/api.js'
  import { Toast } from 'mint-ui'
  export default {
    name: "shop-integral",
    data () {
      return {
        total: '',
        haveUse: '',
        useablePop: false,
        distincte: false
      }
    },
    methods: {
      goDetail (m) {
        this.$router.push({path:'/integralDetailList/'+ m +'/2'})
      },
      withdraw (idx) {
        this.useablePop = true;
        switch (idx) {
            case 0:
            this.distincte = true;
              break;
            case 1:
              this.distincte = false;
              break;
        }
      },
      AIWithdrawTransfer (idx) {
        switch (idx) {
          case 0:
            this.$router.push('/withdraw')
            break;
          case 1:
            this.$router.push('/useableIntegralTransfer')
            break;
        }
      },
      AIWithdrawTransferRecord (idx) {
        this.$router.push({path:'/useableIntegralTransferRecord/'+ idx})
      }
    },
    created () {
      api.availableIntegral()
        .then(res => {
          if (res.code === 200) {
            this.total = res.data.ready_points;
          } else {
            Toast(res.msg);
          }
        })
        .catch(err => {
          console.log(err)
        })
      api.useAbleIntegral(1)
        .then(res => {
          if (res.code === 200){
            this.haveUse = res.total
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/assets";
</style>
