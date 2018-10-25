<template>
    <div class="wrapper">
      <div class="detail-container">
        <div class="detail-swipe-container" :style="{'height': nowHeight + 'px'}">
          <p class="detail-back-car">
            <span class="detail-back" @click="detailBack"><i class="icon icon-detail-back"></i></span>
            <span class="detail-car"><i class="icon icon-detail-car"></i></span>
          </p>
          <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="">
            <swiper-slide><img src="../../assets/images/goods_pic1.png" alt="" class="swiper-image"></swiper-slide>
            <swiper-slide><img src="../../assets/images/goods_pic2.jpg" alt="" class="swiper-image"></swiper-slide>
            <swiper-slide><img src="../../assets/images/goods_pic3.jpg" alt="" class="swiper-image"></swiper-slide>
            <div class="swiper-pagination"  slot="pagination"></div>
          </swiper>
        </div>
      </div>
      <div class="detail-name-price">
        <p class="detail-goods-price"><span>¥</span>226.00</p>
        <!--<div class="detail-goods-integral">
          <p><i class="icon icon-x-integral"></i><span>667.00</span></p>
          <p><i class="icon icon-y-integral"></i><span>1622.00</span></p>
        </div>-->
        <div class="detail-goods-integral-and-money">
          <p><i class="icon icon-x-integral"></i><span>22600.00</span><b>+</b><u>¥</u>66000.00</p>
          <p><i class="icon icon-y-integral"></i><span>3326.00</span><b>+</b><u>¥</u>8886.00</p>
        </div>
        <p class="detail-goods-name">被套单件学生宿舍双人单人150x220x230被罩冬季男女1.5m通用型被罩</p>
      </div>
      <div class="detail-goods-detail">
        <p class="detail-title"><span></span>商品详情</p>
        <div class="detail-img">
          <img src="../../assets/images/goods_pic1.png" alt="">
          <img src="../../assets/images/goods_pic2.jpg" alt="">
          <img src="../../assets/images/goods_pic3.jpg" alt="">
          <img src="../../assets/images/goods_pic1.png" alt="">
          <img src="../../assets/images/goods_pic2.jpg" alt="">
          <img src="../../assets/images/goods_pic3.jpg" alt="">
          <img src="../../assets/images/goods_pic1.png" alt="">
          <img src="../../assets/images/goods_pic2.jpg" alt="">
          <img src="../../assets/images/goods_pic3.jpg" alt="">
        </div>
      </div>
      <div class="detail-clear">
        <div class="detail-clear-store"><i class="icon icon-detail-service"></i><p>店铺</p></div>
        <div class="detail-clear-service"><i class="icon icon-detail-store"></i><p>客服</p></div>
        <div class="detail-clear-join-car" @click="joinBuy(0)">加入购物车</div>
        <div class="detail-clear-buy-now" @click="joinBuy(1)">立即购买</div>
      </div>
      <mt-popup v-model="popupVisible" class="detail-pop" position="bottom">
        <div class="detail-pop-center">
          <div class="pop-head">
            <div class="detail-small-img">
              <img src="../../assets/images/goods_pic1.png" alt="">
            </div>
            <div class="pop-detail-txt">
              <p class="pop-price"><span>¥</span>2220.00</p>
              <!--<div class="pop-integral">
                <p><i class="icon icon-x-integral"></i><span>660.00</span></p>
                <p><i class="icon icon-y-integral"></i><span>77.00</span></p>
              </div>-->
              <div class="pop-integral-money">
                <p><i class="icon icon-x-integral"></i><span>667.00</span><b>+</b><u>¥</u><span>77.00</span></p>
                <p><i class="icon icon-y-integral"></i><span>882.225</span><b>+</b><u>¥</u><span>886.00</span></p>
              </div>
              <p class="pop-inventory">库存 {{inventory}} 件</p>
            </div>
          </div>
          <div class="pop-style">
            <div class="pop-style-type1">
              <p class="style-head">颜色</p>
              <div class="style-type-center">
                <span @click="choseStyle(0, index)" :class="{'style-on':st1Idex===index}" v-for="(st1, index) in style1" :key="index">{{st1}}</span>
              </div>
            </div>
            <div class="pop-style-type2">
              <p class="style-head">分类</p>
              <div class="style-type-center">
                <span @click="choseStyle(1, index)" :class="{'style-on':st2Idex===index}" v-for="(st2, index) in style2" :key="index">{{st2}}</span>
              </div>
            </div>
          </div>
          <div class="pop-total">
            <p class="total-title">购买数量</p>
            <div class="pop-total-center">
              <button class="cti-sub cti" @click="subAdd(0)">-</button>
              <input type="number" class="cti-number" readonly="" :value="value">
              <button class="cti-add cti" @click="subAdd(1)">+</button>
            </div>
          </div>
          <button class="pop-confirm" @click="detailConfirm">确定</button>
        </div>
      </mt-popup>
    </div>
</template>

<script>
  import {swiper, swiperSlide } from 'vue-awesome-swiper'
  import { Toast } from 'mint-ui';
  export default {
    name: "detail",
    components: {
      swiper,
      swiperSlide,
    },
    data () {
      return {
        swiperOption: {
          autoplay:true,
          loop:true,
          delay: 1000,
          effect : 'fade',
          pagination: {
            el: '.swiper-pagination',
          },
        },
        nowHeight: 0,
        popupVisible: false,
        choseWay: 0,
        value: 1, // 购买数量
        inventory: 20, // 库存
        style1: ['红色', '橙色', '黄色', '绿色', '青色', '蓝色', '紫色', '白色', '黑色' ], // 样式1--颜色
        st1Idex:0,
        style2: ['红红色', '橙橙橙色', '黄色', '绿绿绿色', '青色', '蓝蓝蓝色', '紫紫紫紫紫紫色', '白色', '黑色'],
        st2Idex: 0
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper;
      }
    },
    mounted() {
      this.swiper.slideTo(1, 1000, true);
    },
    methods: {
      // 返回
      detailBack () {
        window.history.go(-1);
      },

      joinBuy(idx){
        this.popupVisible = true;
        this.choseWay = idx;
      },
      // 商品加减
      subAdd (idx) {
        switch (idx) {
          // 商品减少
          case 0:
            console.log( this.value)
            if (this.value === 1) {
              this.value = 1;
              return false;
            } else {
              this.value--;
              // this.$emit('input', {res: this.value, other: '--'})
            }
            break;
          // 商品增加
          case 1:
            if (this.value < this.inventory) {
              this.value++;
              // this.$emit('input', {res: this.value, other: '++'})
            } else {
              Toast({
                message: '已达到最大购买数量',
                position: 'bottom',
                duration: 2000
              })
            }
            break;
        };
      },
      detailConfirm () {
        this.popupVisible = false;
        switch (this.choseWay) {
          // 加入购物车
          case 0:
            Toast({
              message: '加入购物车',
              position: 'middle',
              duration: 2000
            })
            break;
          // 立即购买
          case 1:
            Toast({
              message: '立即购买',
              position: 'middle',
              duration: 2000
            })
            this.$router.push('/confirmOrder')
            break;
        };
      },
      choseStyle (idx, eleIndex) {
        switch (idx) {
          case 0:
            this.st1Idex = eleIndex
            break;
          case 1:
            this.st2Idex = eleIndex
            break;

        }
      }
    },
    created () {
      this.nowHeight = window.screen.availWidth;
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/detail.less";
</style>
