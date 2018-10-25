<template>
    <div class="wrapper">
      <div class="moduleHead">
        <a @click="goBackUp"></a>确认付款
      </div>
      <div class="apply-container">
        <div class="apply-price" v-if="showModel">
          <h1>¥<span>3369.00</span></h1>
          <div class="apply-integral">
            <p><i class="icon icon-x-integral"></i><span>336.00</span><b>+</b><u>¥</u><span>77.00</span></p>
            <p><i class="icon icon-y-integral"></i><span>445.00</span><b>+</b><u>¥</u><span>88.00</span></p>
          </div>
          <div class="apply-integral-money">
            <p><i class="icon icon-x-integral"></i><span>336.00</span></p>
            <p><i class="icon icon-y-integral"></i><span>445.00</span></p>
          </div>
        </div>
        <div class="apply-price" v-if="!showModel">
          <h1 v-if="applyClass===0">¥<span>3369.00</span></h1>
          <div class="apply-integral">
            <p v-if="applyClass===3"><i class="icon icon-x-integral"></i><span>336.00</span><b>+</b><u>¥</u><span>77.00</span></p>
            <p v-if="applyClass===4"><i class="icon icon-y-integral"></i><span>445.00</span><b>+</b><u>¥</u><span>88.00</span></p>
          </div>
          <div class="apply-integral-money">
            <p v-if="applyClass===1"><i class="icon icon-x-integral"></i><span>336.00</span></p>
            <p v-if="applyClass===2"><i class="icon icon-y-integral"></i><span>445.00</span></p>
          </div>
        </div>
        <div class="apply-way">
          <p class="apply-title">支付方式：</p>
          <div v-for="(aw, index) in applyWay" :key="index" :class="{'apply-way-on': index===applyClass}" @click="choseApply(index)"><i class="icon" :class="aw.icon"></i><span>{{aw.txt}}</span></div>
        </div>
      </div>
      <button class="apply-go" @click="applyGo">提交订单</button>
    </div>
</template>

<script>
  import { MessageBox } from 'mint-ui'
  export default {
    name: "apply",
    data () {
      return {
        applyWay: [
          {
            icon: 'icon-pay-weChat',
            txt: '微信支付'
          },
          {
            icon: 'icon-pay-integral-x',
            txt: '消费积分'
          },
          {
            icon: 'icon-pay-integral-y',
            txt: '可用积分'
          },
          {
            icon: 'icon-pay-integral-x-weChat',
            txt: '消费积分 + 微信支付'
          },
          {
            icon: 'icon-pay-integral-y-weChat',
            txt: '可用积分 + 微信支付'
          },
          ],
        applyClass: -1,
        showModel: true
      }
    },
    methods : {
      goBackUp() {
        MessageBox({
          title: '提示',
          message: '您确认放弃支付吗？',
          showCancelButton: true
        })
          .then(res => {
            if (res == 'confirm') {
              window.history.go(-1)
            } else {
              return false
            }
          })
      },
      choseApply(idx) {
        this.showModel = false;
        this.applyClass = idx;
      },
      applyGo () {

      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/apply";
</style>
