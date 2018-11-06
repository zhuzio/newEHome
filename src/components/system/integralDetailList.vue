<template>
  <div class="wrapper">
    <div class="moduleHead">
      <a href="javascript:window.history.go(-1)"></a>{{title}}
    </div>
    <div class="hc-container">
      <div class="hc-list" v-for="(hc, index) in hcList" :key="index" v-if="type===0">
        <p class="hc-time"><span>{{hc.mark}}</span><span class="hc-time-txt">{{hc.created_at}}</span></p>
        <p class="hc-num"><span></span><span> +{{hc.money}}</span></p>
      </div>
      <div class="hc-list" v-for="(hc, index) in hcList" :key="index" v-if="type===1">
        <p class="hc-time"><span>{{hc.subject}}</span> <span class="hc-time-txt">{{hc.created_at}}</span></p>
        <p class="hc-num"><span class="hc-order-sn">订单编号：<i>{{hc.order_sn}}</i></span><span class="hc-order-num">- <i>{{hc.total_point}}</i></span></p>
      </div>
      <div class="hc-list" v-for="(hc, index) in hcList" :key="index" v-if="type===2">
        <p class="hc-aaa"><span>订单编号：</span><span>{{hc.order_sn}}</span></p>
        <p class="hc-time"><span class="hc-sub">{{hc.subject}}</span> <span class="hc-time-txt">{{hc.created_at}}</span></p>
        <p class="hc-num"><span class="hc-order-sn">消费数值：</span><span class="hc-order-num">- <i>{{hc.total_point}}</i></span></p>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/assets/js/api.js'
  import { Toast } from 'mint-ui'
  export default {
    name: "have-conversion",
    data () {
      return {
        params: this.$route.params.m,
        year: (this.$route.params.m).split('-')[0],
        month: (this.$route.params.m).split('-')[1],
        hcList: [],
        title:'',
        type: parseInt(this.$route.params.t)
      }
    },
    created () {
      console.log(this.$route.params)
      let tId = parseInt(this.$route.params.t)
      switch (tId) {
        case 0:
          this.title = ''+(this.$route.params.m).split('-')[0]+'年'+(this.$route.params.m).split('-')[1]+'月转化列表'
          api.haveConversionIntegralDay(this.params)
            .then(res => {
              if (res.code === 200) {
                this.hcList = res.data;
              }
            })
            .catch(err => {
              console.log(err)
            })
          break;
        case 1:
          this.title = ''+(this.$route.params.m).split('-')[0]+'年'+(this.$route.params.m).split('-')[1]+'月购物积分消费列表'
          api.shopIntegralDay(this.params)
            .then(res => {
              this.hcList = res.data;
            })
            .catch(err => {
              console.log(err)
            })
          break;
        case 2:
          this.title = '可用积分消费记录';
          api.useAbleIntegral()
            .then(res => {
              this.hcList = res.data;
            })
            .catch(err => {
              console.log(err)
            })
          break;
      }
      /**/
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/haveConversion";
</style>
