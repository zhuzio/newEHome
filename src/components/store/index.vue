<template>
    <div class="wrapper">
      <div class="search-container">
        <span class="search-input"><i class="icon icon-search"></i><u>输入关键字</u></span><span class="search-button fr">搜索</span>
      </div>
      <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="">
        <swiper-slide v-for="(sp, index) in swipeBox" :key="index"><img :src="imgUrl+sp.pic" alt="" class="swiper-image"></swiper-slide>
       <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
      <div class="index-classify">
        <ul>
          <li><img src="../../assets/images/nvz.png" alt=""><span>女装</span></li>
          <li><img src="../../assets/images/naz.png" alt=""><span>男装</span></li>
          <li><img src="../../assets/images/nvx.png" alt=""><span>女鞋</span></li>
          <li><img src="../../assets/images/nax.png" alt=""><span>男鞋</span></li>
          <li><img src="../../assets/images/all.png" alt=""><span>全部</span></li>
        </ul>
      </div>
      <div class="index-ad">
        <div class="ad-logo"></div>
        <div class="marquee_box">
          <ul class="marquee_list" :style="{ 'top': -num + 'rem'}" :class="{'marquee_top':num}">
            <li v-for="(item, index) in marqueeList" :key="index">{{item}}</li>
          </ul>
        </div>
        <div class="ad-more">更多 >></div>
      </div>
      <div class="floor-container">
        <div class="each-floor">
          <div class="floor-title ft1">
            <p>298专区</p>
            <span>更多>></span>
          </div>
          <div class="ft1-container">
            <ul>
              <router-link to="detail"><li><img src="../../assets/images/1.jpg" alt=""></li></router-link>
              <li><img src="../../assets/images/2.jpg" alt=""></li>
              <li><img src="../../assets/images/4.jpg" alt=""></li>
              <li><img src="../../assets/images/1.jpg" alt=""></li>
              <li><img src="../../assets/images/2.jpg" alt=""></li>
              <li><img src="../../assets/images/4.jpg" alt=""></li>
            </ul>
            <div class="ft1-ad">
              <img src="../../assets/images/ft1_ad.png" alt="">
            </div>
          </div>
        </div>
        <div class="each-floor">
          <div class="floor-title ft2">
            <p>积分专区</p>
            <span>更多>></span>
          </div>
          <div class="ft2-container">
            <ul class="ft2-container-ul">
              <li>
                <img src="../../assets/images/1.jpg" alt="">
                <p class="goods-name">美加净花肌之恋护肤乳（豪华装）</p>
                <div class="goods-price">
                  <p><i class="icon icon-x-integral"></i><span>3320.00</span></p>
                  <p><i class="icon icon-y-integral"></i><span>450.00</span></p>
                </div>
                <p class="goods-price-rmb"><span>¥</span>139.60</p>
              </li>
              <li>
                <img src="../../assets/images/1.jpg" alt="">
                <p class="goods-name">美加净花肌之恋护肤乳（豪华装）</p>
                <div class="goods-price">
                  <p><i class="icon icon-x-integral"></i><span>3320.00</span></p>
                  <p><i class="icon icon-y-integral"></i><span>450.00</span></p>
                </div>
                <p class="goods-price-rmb"><span>¥</span>139.60</p>
              </li>
              <li>
                <img src="../../assets/images/1.jpg" alt="">
                <p class="goods-name">美加净花肌之恋护肤乳（豪华装）</p>
                <div class="goods-price">
                  <p><i class="icon icon-x-integral"></i><span>3320.00</span></p>
                  <p><i class="icon icon-y-integral"></i><span>450.00</span></p>
                </div>
                <p class="goods-price-rmb"><span>¥</span>139.60</p>
              </li>
              <li>
                <img src="../../assets/images/1.jpg" alt="">
                <p class="goods-name">美加净花肌之恋护肤乳（豪华装）</p>
                <div class="goods-price">
                  <p><i class="icon icon-x-integral"></i><span>3320.00</span></p>
                  <p><i class="icon icon-y-integral"></i><span>450.00</span></p>
                </div>
                <p class="goods-price-rmb"><span>¥</span>139.60</p>
              </li>
            </ul>
            <div class="goods-banner-container">
              <p class="goods-banner-title">
                <span class="banner-txt fl">品牌街</span>
                <span class="banner-more fr">更多 >></span>
              </p>
              <ul class="goods-banner-list">
                <li><img src="../../assets/images/goods_logo.png" alt="">
                  <p>美国Brizo龙头</p>
                </li>
                <li><img src="../../assets/images/goods_logo.png" alt="">
                  <p>美国Brizo龙头</p>
                </li>
                <li><img src="../../assets/images/goods_logo.png" alt="">
                  <p>美国Brizo龙头</p>
                </li>
                <li><img src="../../assets/images/goods_logo.png" alt="">
                  <p>美国Brizo龙头</p>
                </li>
                <li><img src="../../assets/images/goods_logo.png" alt="">
                  <p>美国Brizo龙头</p>
                </li>
                <li><img src="../../assets/images/goods_logo.png" alt="">
                  <p>美国Brizo龙头</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="each-floor">
          <div class="floor-title ft3">
            <p>积分现金专区</p>
            <span>更多>></span>
          </div>
          <div class="ft3-container">
            <ul class="ft2-container-ul">
              <li>
                <img src="../../assets/images/1.jpg" alt="">
                <p class="goods-name">美加净花肌之恋护肤乳（豪华装）</p>
                <div class="goods-price-integral">
                  <div>
                    <p class="spec"><i class="icon icon-x-integral"></i><span>1320.00</span></p>
                    <u>+</u>
                    <p><span class="price-rmb">¥</span>233.00</p>
                  </div>
                  <div>
                    <p class="spec"><i class="icon icon-y-integral"></i><span>4450.00</span></p>
                    <u>+</u>
                    <p><span class="price-rmb">¥</span>1233.00</p>
                  </div>
                </div>
                <p class="goods-price-rmb"><span>¥</span>139.60</p>
              </li>
              <li>
                <img src="../../assets/images/1.jpg" alt="">
                <p class="goods-name">美加净花肌之恋护肤乳（豪华装）</p>
                <div class="goods-price-integral">
                  <div>
                    <p class="spec"><i class="icon icon-x-integral"></i><span>1320.00</span></p>
                    <u>+</u>
                    <p><span class="price-rmb">¥</span>233.00</p>
                  </div>
                  <div>
                    <p class="spec"><i class="icon icon-y-integral"></i><span>4450.00</span></p>
                    <u>+</u>
                    <p><span class="price-rmb">¥</span>1233.00</p>
                  </div>
                </div>
                <p class="goods-price-rmb"><span>¥</span>139.60</p>
              </li>
              <li>
                <img src="../../assets/images/1.jpg" alt="">
                <p class="goods-name">美加净花肌之恋护肤乳（豪华装）</p>
                <div class="goods-price-integral">
                  <div>
                    <p class="spec"><i class="icon icon-x-integral"></i><span>1320.00</span></p>
                    <u>+</u>
                    <p><span class="price-rmb">¥</span>233.00</p>
                  </div>
                  <div>
                    <p class="spec"><i class="icon icon-y-integral"></i><span>4450.00</span></p>
                    <u>+</u>
                    <p><span class="price-rmb">¥</span>1233.00</p>
                  </div>
                </div>
                <p class="goods-price-rmb"><span>¥</span>139.60</p>
              </li>
              <li>
                <img src="../../assets/images/1.jpg" alt="">
                <p class="goods-name">美加净花肌之恋护肤乳（豪华装）</p>
                <div class="goods-price-integral">
                  <div>
                    <p class="spec"><i class="icon icon-x-integral"></i><span>1320.00</span></p>
                    <u>+</u>
                    <p><span class="price-rmb">¥</span>233.00</p>
                  </div>
                  <div>
                    <p class="spec"><i class="icon icon-y-integral"></i><span>4450.00</span></p>
                    <u>+</u>
                    <p><span class="price-rmb">¥</span>1233.00</p>
                  </div>
                </div>
                <p class="goods-price-rmb"><span>¥</span>139.60</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <tabFoot></tabFoot>
    </div>
</template>

<script>
  import tabFoot from '../comp/tabFoot.vue'
  import {swiper, swiperSlide } from 'vue-awesome-swiper'
  import api from '../../assets/js/api.js'
  import { imgUrl } from '../../assets/js/api.js'
  export default {
    name: "index",
    components: {
      tabFoot,
      swiper,
      swiperSlide
    },
    data() {
      return {
        swiperOption: {
          autoplay:true,
          loop: true,
          delay: 1000,
          // effect : 'fade',
          pagination: {
            el: '.swiper-pagination',
          },
        },
        num: 0,
        marqueeList: [
          '热烈庆祝新易家商城上线',
          '前一百位会员可享受购物优惠',
          '新易家，开启您的购物之旅'
        ],
        swipeBox: [],
        imgUrl:imgUrl
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    mounted() {
      this.swiper.slideTo(1, 1000, true)
    },
    methods: {
      showMarquee:function (num) {
        this.marqueeList.push(this.marqueeList[0]);
        var max = this.marqueeList.length;
        var that = this;
        var marqueetimer =  setInterval(function(){
          num++;
          if(num>=max ){
            num=0;
          }
          that.num=num*0.286;
        }, 3000);
      }
    },
    created () {
      this.showMarquee(this.num)
      api.swipe()
        .then(res => {
          this.swipeBox = res.data;
        })
    },
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/index.less";
</style>
