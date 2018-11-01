<template>
  <div class="wrapper">
    <div class="moduleHead">
      <a href="javascript:window.history.go(-1)"></a>提现记录
    </div>
    <div class="wdr-container">
      <div class="wdr-center">
        <ul>
          <li v-for="(wl, index) in list" :key="index">
            <div class="wdr-card-img">
              <img :src="imgUrl+wl.bank_card.logo.bank_logo" alt="">
            </div>
            <div class="wdr-info">
              <p class="wdr-info-card"><span class="wic-name">{{wl.bank_card.bank}}（<i>{{wl.bank_card.card}}</i>）</span><span class="wic-num"><b>-{{wl.money}}</b></span></p>
              <p class="wdr-info-cost">
                <span class="wic-cost">手续费：{{wl.handling_fee}} 积分</span>
                <span class="wic-status">
                  <i class="wic-pass" v-if="wl.status === 1">已到账</i>
                  <i class="wic-wait" v-if="wl.status === 0">待审核</i>
                  <i class="wic-reject" v-if="wl.status === 2">已驳回</i>
                </span>
              </p>
              <p class="wdr-time">{{wl.created_at}}</p>
              <p></p>
              <p></p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/assets/js/api.js'
  import { imgUrl } from '@/assets/js/api.js'
  import { Toast } from 'mint-ui'
  export default {
    name: "withdraw-record",
    data () {
      return{
        list: [],
        imgUrl: imgUrl
      }
    },
    methods: {

    },
    created () {
      api.withdrawRecord()
        .then(res => {
          if (res.code === 200) {
            this.list = res.data
          } else {
            Toast(res.msg)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/withdraw";
</style>
