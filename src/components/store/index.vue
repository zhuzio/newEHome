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
              <li v-for="(mz, index) in moneyZone" :key="index">
                <router-link :to="/detail/+mz.id">
                  <img :src="imgUrl+mz.default_img" alt="">
                </router-link>
              </li>
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
              <li v-for="(iz, index) in integralZone" :key="index">
                <router-link :to="/detail/+iz.id">
                  <img :src="imgUrl+iz.default_img" alt="">
                  <p class="goods-name">{{iz.name}}</p>
                  <div class="goods-price">
                    <p><i class="icon icon-x-integral"></i><span>{{iz.spec.points}}</span></p>
                    <p><i class="icon icon-y-integral"></i><span>{{iz.spec.points}}</span></p>
                  </div>
                  <!--<p class="goods-price-rmb"><span>¥</span>139.60</p>-->
                </router-link>
              </li>
            </ul>
            <div class="goods-banner-container">
              <p class="goods-banner-title">
                <span class="banner-txt fl">品牌街</span>
                <span class="banner-more fr">更多 >></span>
              </p>
              <ul class="goods-banner-list">
                <li v-for="(bd, index) in bandList"><img :src="imgUrl+bd.logo" :alt="bd.name">
                  <p>{{bd.name}}</p>
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
              <li v-for="(imz, index) in integralMoneyZone" :key="index">
                <router-link :to="/detail/+imz.id">
                  <img :src="imgUrl+imz.default_img" alt="">
                  <p class="goods-name">{{imz.name}}</p>
                  <div class="goods-price-integral">
                    <div>
                      <p class="spec"><i class="icon icon-x-integral"></i><span>{{imz.spec.points}}</span></p>
                      <u>+</u>
                      <p><span class="price-rmb">¥</span>{{imz.spec.ready}}</p>
                    </div>
                    <div>
                      <p class="spec"><i class="icon icon-y-integral"></i><span>{{imz.spec.points}}</span></p>
                      <u>+</u>
                      <p><span class="price-rmb">¥</span>{{imz.spec.ready}}</p>
                    </div>
                  </div>
                  <!--<p class="goods-price-rmb"><span>¥</span>139.60</p>-->
                </router-link>
              </li>
            </ul>
          </div>
        </div>
        <p style="text-align: center;color: #4e4c50;font-size: .2rem" onclick="window.location.href='http://www.miitbeian.gov.cn'">豫ICP备18038220号</p>
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
        imgUrl:imgUrl,
        moneyZone: [],
        integralZone: [],
        integralMoneyZone: [],
        bandList: []
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
      },
    },
    created () {
      this.showMarquee(this.num)
      api.swipe()
        .then(res => {
          this.swipeBox = res.data;
        });
      api.getZone({
        page: 1,
        type: 1
      })
        .then(res => {
         this.integralZone = res.data;
        });
      api.getZone({
        page: 1,
        type: 2
      })
        .then(res => {
          this.integralMoneyZone = res.data;
        });
      api.getZone({
        page: 1,
        type: 3
      })
        .then(res => {
          this.moneyZone = res.data;
        });
      api.getBand()
        .then(res => {
          this.bandList = res.data;
        })
    },
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/index.less";
</style>
