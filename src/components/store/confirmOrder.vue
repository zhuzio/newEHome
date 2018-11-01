<template>
  <div class="wrapper">
    <div class="moduleHead">
      <a href="javascript:window.history.go(-1)"></a>
      确认订单
    </div>
    <router-link to="">
      <div class="confirm-order-container">
        <div class="co-address"><i class="icon icon-confirm-address"></i></div>
        <div class="co-info">
          <p class="co-info-receiver">收货人：{{coReceiver}} <span>{{coTel}}</span></p>
          <p class="co-info-receiver-address">收货地址：{{coAds}}</p>
        </div>
        <div class="co-chose"><i class="icon icon-right"></i></div>
      </div>
    </router-link>
    <div class="confirm-order-goods">
      <p class="co-goods-name">金染家织旗舰店</p>
      <div class="co-goods-center">
        <div class="co-goods-img"><img src="../../assets/images/2.jpg" alt=""></div>
        <div class="co-goods-info">
          <p class="co-goods-info-name">被套单件学生宿舍双人单人150x220x230被罩冬季男女1.5m通用型被罩</p>
          <p class="co-goods-info-style">梦幻童话；200x230cm</p>
          <!--<div class="co-goods-integral-money">
            <p><i class="icon icon-x-integral"></i><span>330.00</span><b>+</b><u>¥</u><span>200.00</span></p>
            <p><i class="icon icon-y-integral"></i><span>4562.00</span><b>+</b><u>¥</u><span>7893.00</span></p>
          </div>-->
          <div class="co-goods-integral">
            <p><i class="icon icon-x-integral"></i><span>66750.00</span></p>
            <p><i class="icon icon-y-integral"></i><span>79894.00</span></p>
          </div>
          <div class="co-goods-price-total">
            <p>¥ <span>560.00</span></p>
            <p class="co-goods-total">X <span>1</span></p>
          </div>
        </div>
      </div>
      <div class="co-other">
        <div class="co-other-list"><span>购买数量</span><span>1</span></div>
        <div class="co-other-list"><span>运费</span><span>¥ 0</span></div>
        <div class="co-other-list"><span>买家留言：</span><input type="text" placeholder="（选填）填写您的留言"></div>
      </div>
      <div class="co-final-price">
        <div class="co-final-price-txt">
          <p>共计 1 件商品 小计 </p>
        </div>
        <div class="co-final-price-center">
          <p class="co-spec">¥ 34552.00</p>
          <div class="co-goods-integral-money">
            <p><i class="icon icon-x-integral"></i><span>330.00</span><b>+</b><u>¥</u><span>200.00</span></p>
            <p><i class="icon icon-y-integral"></i><span>4562.00</span><b>+</b><u>¥</u><span>7893.00</span></p>
          </div>
          <!--<div class="co-goods-integral">
            <p><i class="icon icon-x-integral"></i><span>66750.00</span></p>
            <p><i class="icon icon-y-integral"></i><span>79894.00</span></p>
          </div>-->
        </div>
      </div>
    </div>
    <button class="confirm-order-clear" @click="confirmOrder">提交订单</button>
  </div>
</template>

<script>
  import api from '@/assets/js/api.js'
  let token = localStorage.getItem('token')
  import { MessageBox } from 'mint-ui'
  export default {
    name: "confirm-order",
    data () {
      return{
        coReceiver: '',
        coTel: '',
        coAds: ''
      }
    },
    methods : {
      confirmOrder() {
        this.$router.push('/apply')
      }
    },
    created () {
      api.getDefaultAddress()
        .then(res => {
          if (res.data.length === 0) {
            MessageBox({
              title: '提示',
              message: '您还没有地址，是否去添加？',
              showCancelButton: true
            })
              .then(res => {
                if (res == 'confirm') {
                  this.$router.push('/addAddress/2');
                } else {
                  window.history.go(-1);
                }
              })
          } else {
            this.coReceiver = res.data.name;
            this.coTel = res.data.phone;
            this.coAds = res.data.province + res.data.city + res.data.area + res.data.detail;
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/confirmOrder";
</style>
