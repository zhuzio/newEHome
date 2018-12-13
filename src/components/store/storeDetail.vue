<template>
  <div class="wrapper">
    <div class="moduleHead">
      <a href="javascript:window.history.go(-1)"></a> {{store.storeInfo.name}}
    </div>
    <div class="bz-container">
      <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite" ref="scrollContainer" >
        <div class="bz-head">
          <div class="bz-img">
            <img :src="store.imgUrl + store.storeInfo.logo" :alt="store.storeInfo.name">
          </div>
          <div class="bz-info">
            <p class="bz-name">{{store.storeInfo.name}}</p>
            <p class="bz-des">{{store.storeInfo.desc}}</p>
          </div>
        </div>
        <div class="bz-center">
        <ul class="bz-goods-container">
          <li class="bz-goods" v-for="(sg, index) in store.goods" :key="index">
            <router-link :to="/detail/+sg.id">
              <div class="goods-img-box">
                <img :src="store.imgUrl + sg.default_img" :alt="sg.name">
              </div>
              <p class="bz-goods-name">{{sg.name}}</p>
              <div class="goods-price"  v-if="sg.type == 1">
                <div>
                  <p><i class="icon icon-x-integral"></i><span style="color:#ff3b30;">{{sg.spec.points}}</span></p>
                  <p class="mm" style="color: #c3c3c3"><i>¥</i><s>{{sg.spec.ready}}</s></p>
                </div>
              </div>
              <div class="goods-price-integral" v-if="sg.type == 2">
                <!--<div>
                  <p class="spec"><i class="icon icon-x-integral"></i><span>{{bz.spec.points}}</span></p>
                  <u>+</u>
                  <p><span class="price-rmb">¥</span>{{bz.spec.ready}}</p>
                </div>
                <div>
                  <p class="spec"><i class="icon icon-y-integral"></i><span>{{bz.spec.points}}</span></p>
                  <u>+</u>
                  <p><span class="price-rmb">¥</span>{{bz.spec.ready}}</p>
                </div>-->
                <p class="goods-price-rmb" style="color: #c3c3c3"><u>市场价：</u><b><span>¥</span>{{sg.spec.market}}</b></p>
                <!--<div>
                    <p class="spec"><i class="icon icon-x-integral"></i><span>{{imz.spec.points}}</span></p>
                    <u>+</u>
                    <p><span class="price-rmb">¥</span>{{imz.spec.ready}}</p>
                  </div>-->
                <h3>会员价：<span>现金 + 积分</span></h3>
                <div>
                  <p><span class="price-rmb">¥</span>{{sg.spec.ready}}</p>
                  <u>+</u>
                  <p class="spec"><i class="icon icon-y-integral"></i><span>{{sg.spec.points}}</span></p>
                </div>
              </div>
              <div class="goods-price-rmb-box" v-if="sg.type == 3">
                <div class="goods-price-rmb">
                  ¥ <span>{{sg.spec.ready}}</span>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
        <p class="add-more" style="margin-top: .15rem" v-if="!store.addM"><mt-spinner type="triple-bounce"></mt-spinner></p>
        <p class="add-more" style="margin-top: .15rem" v-if="store.addM">没有更多了</p>
        <div class="container-no-data" v-if="store.isNo">
          <img src="../../assets/images/no_data.png" alt="">
          <p class="no-data-txt2">此店铺还没有上传商品，请浏览其他店铺 ~</p>
        </div>
      </div>
      </v-scroll>
    </div>

  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  import api from "@/assets/js/api";
  import { imgUrl } from '../../assets/js/api.js'
  import cache from '@/assets/js/catch.js'
  import Scroll from '../comp/scroll.vue';
  export default {
    name: "store-detail",
    data () {
      return{
        store: {
          id: parseInt(this.$route.params.id),
          page: 1,
          title: '',
          storeInfo: [],
          goods: [],
          addM: false,
          isNo: false,
          imgUrl: imgUrl,
        },
        comeId: parseInt(this.$route.params.id),
        cache: cache,
        tops: 0
      }
    },
    components : {
      'v-scroll': Scroll
    },
    beforeDestroy(){
      let cacheData  = this.store;
      this.cache.setCache('leaveSto',{cd: cacheData, top: this.$refs.scrollContainer.startScroll});
      let ele = this.$refs.scrollContainer;
      // console.log(ele)
      // console.log(this.$refs.scrollContainer.offsetHeight)
    },
    methods: {
      getStoreList () {
        api.getStore({
          page: 1,
          id: this.store.id
        })
          .then(res => {
            if (res.code === 200) {
              this.store.storeInfo = res.data.store;
              this.store.goods = res.data.goods;
            }
          })
      },
      onRefresh(done) {
        this.cache.remove('leaveSto');
        setTimeout(() => {
          window.location.reload()
        },2000);
        done();

      },
      onInfinite(done) {
        if (!this.store.addM) {
          setTimeout(() => {
            this.store.page += 1;
            api.getStore({
              page: this.store.page,
              id: this.store.id
            })
              .then(res => {
                if (res.data.goods.length === 0) {
                  Toast('到底了...');
                  this.$el.querySelector('.load-more').style.display = 'none';
                  this.store.addM = true;
                } else {
                  for (var i in res.data.goods) {
                    this.store.goods.push((res.data.goods)[i])
                  }
                  done();
                }
              })
          },3000)
        } else {
          this.$el.querySelector('.load-more').style.display = 'none';
        }
      },
    },
    created () {

      let stoData = this.cache.getCache('leaveSto');
      if (stoData) {
        let cacheId = stoData.cd.id;
        if ( this.comeId !== cacheId) {
          this.getStoreList();
        } else {
          this.store = stoData.cd;
          this.tops = stoData.top;
          // console.log(this.tops)
          // console.log(document.getElementById('scrollContainer'))




          //
          // document.getElementById('scrollContainer').animate({screenTop: this.tops + 'px'})
          // document.documentElement.scrollHeight = this.tops + 'px'
          // document.getElementById('scrollContainer').offset().top = this.tops + 'px'
          // console.log(document.getElementById('scrollContainer'))
          // console.log(this.$refs.scrollContainer)
          // document.getElementsByClassName('inner')[0].scrollTop = this.tops
            // ele.scrollTo(0, stoData.top)
          // console.log(document.getElementsByClassName('inner').offsetTop)
          // ele.offsetTop = stoData.top
          // this.$refs.scrollContainer.document.documentElement.scrollTop = stoData.top


        }
      } else {
        this.getStoreList();
      }
    },
    mounted () {
      // console.log(document.getElementById('scrollContainer'))
      document.getElementById('scrollContainer').scrollTop = this.tops
      // console.log(this.tops)
      // document.getElementsByClassName('inner')[0].scrollTop  = this.tops + 'px'
      // console.log(document.getElementsByClassName('inner')[0])

      // this.$refs.scrollContainer.offsetTop = this.tops
    },
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/band";
</style>
