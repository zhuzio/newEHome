<template>
    <div class="wrapper">
      <div class="shop-car-container" v-if="!isNo">
        <div class="shop-car-header"></div>
        <div class="shop-car-list-container">
          <div class="sc-store" v-for="(store, index) in  carList" :key="index">
            <p class="sc-store-name">{{store.shop_name}}<span class="fr">店铺</span></p>
            <div class="sc-goods-container">
              <div class="sc-goods-list" v-for="(goods, idx) in store.child" :key="idx">
                <div class="sc-goods-check">
                  <input type="radio" :id="carId+goods.product_id" name="shopCar">
                  <label :for="carId+goods.product_id"></label>
                </div>
                <div class="sc-goods-img"><img :src="imgUrl+goods.products.default_img" alt=""></div>
                <div class="sc-goods-detail">
                  <p class="sc-goods-name">{{goods.products.name}}</p>
                  <div class="sc-goods-type-del">
                    <div class="sc-goods-type">
                      <p><span>{{goods.products.spec_name1}}：</span>{{goods.specification}}</p>
                      <p><span>{{goods.products.spec_name2}}：</span>{{goods.spec.size}}</p>
                    </div>
                    <div class="sc-goods-del">
                      <button @click="deleteCar(goods, idx, store, index)">删除</button>
                    </div>
                  </div>
                  <div class="sc-goods-price sc-goods-integral-and-money" v-if="goods.products.type == 2">
                    <p class="scg-integral-money scg-x"><i class="icon icon-x-integral"></i><span>2283.00</span><b>+</b><u>¥</u><span>233.00</span></p>
                    <p class="scg-integral-money scg-k"><i class="icon icon-y-integral"></i><span>1234.00</span><b>+</b><u>¥</u><span>122.00</span></p>
                  </div>
                  <div class="sc-goods-price sc-goods-integral" v-if="goods.products.type == 1">
                    <div class="scg-integral">
                      <p><i class="icon icon-x-integral"></i><span>3668.00</span></p>
                      <p><i class="icon icon-y-integral"></i><span>7882.00</span></p>
                    </div>
                  </div>
                  <div class="sc-goods-price-total">
                    <div class="sc-goods-price-money"><span v-if="goods.products.type == 3">¥ <i>2262.00</i></span></div>
                    <div class="sc-goods-total">
                      <button>-</button>
                      <input type="text" readonly disabled :value="goods.num">
                      <button>+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="shop-car-clear">
          <div class="sc-total-money">合计:<span v-if="type == 3"><i>¥</i>222.00</span></div>
          <div class="sc-total-integral">
            <div class="sc-t-integral" v-if="type == 1">
              <p><i class="icon icon-x-integral"></i><span>2000.00</span></p>
              <p><i class="icon icon-y-integral"></i><span>5353.00</span></p>
            </div>
            <div class="sc-t-integral-and-money" v-if="type == 2">
              <p><i class="icon icon-x-integral"></i><span>1258.00</span><b>+</b><u>¥</u><span>213.00</span></p>
              <p><i class="icon icon-y-integral"></i><span>668.00</span><b>+</b><u>¥</u><span>3241.00</span></p>
            </div>
          </div>
          <div class="sc-clear-button">
            <button>结算</button>
          </div>
        </div>
      </div>
      <div class="container-no-data" v-if="isNo">
        <img src="../../assets/images/no_data.png" alt="">
        <p class="no-data-txt1">购物车竟然是空的</p>
        <p class="no-data-txt2">在忙，也要记得买点什么犒赏自己~</p>
      </div>
      <tabFoot></tabFoot>
    </div>
</template>

<script>
  import tabFoot from '../comp/tabFoot.vue'
  import api from '../../assets/js/api.js'
  import { imgUrl } from '../../assets/js/api.js'
  import { MessageBox } from 'mint-ui'
  import { Toast } from 'mint-ui';
  let token = localStorage.getItem('token')
  export default {
    name: "shop-car",
    components: {
      tabFoot,

    },
    data () {
      return {
        page: 1,
        isNo: false,
        carList: [],
        carId: 'car',
        imgUrl: imgUrl,
        num: 0,
        type: 3
      }
    },
    methods: {
      deleteCar (e, idx, store, idxs) {
        console.log(e)
        MessageBox({
          title: '提示',
          message: '确认删除此商品?',
          showCancelButton: true
        })
          .then(ret => {
            if (ret == 'confirm') {
              let delForm = this.$qs.stringify({
                product_id: e.product_id,
                token: token
              })
              api.shopCarDelete(delForm)
                .then(res => {
                  store.child.splice(idx, 1);
                  if (store.child.length === 0) {
                    this.carList.splice(idxs, 1)
                  }
                  if (this.carList.length === 0) {
                    this.isNo = true
                  }
                  Toast(res.msg)
                })
                .catch(err => {
                  console.log(err)
                })
            } else {
              return false
            }
          })
      }
    },
    created () {
      api.getCarList(this.page)
        .then(res => {
          if (res.data.length === 0) {
            this.isNo = true;
          } else {
            this.carList = res.data;
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/shopCar";
</style>
