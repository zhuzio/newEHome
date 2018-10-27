<template>
  <div class="wrapper">
    <div class="moduleHead">
      <a href="javascript:window.history.go(-1)"></a>{{title}}
    </div>
    <div class="hc-container">
      <div class="hc-list" v-for="(hc, index) in hcList" :key="index">
        <p class="hc-time"><span>{{hc.mark}}</span><span class="hc-time-txt">{{hc.created_at}}</span></p>
        <p class="hc-num">+<span> {{hc.money}}</span></p>
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
        title:''
      }
    },
    created () {
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
          this.title = ''+(this.$route.params.m).split('-')[0]+'年'+(this.$route.params.m).split('-')[1]+'月消费积分消费列表'
          console.log('消费积分消费记录')
          break;
        case 2:
          this.title = '可用积分消费记录';
          api.useAbleIntegral()
            .then(res => {
              console.log(res)
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
