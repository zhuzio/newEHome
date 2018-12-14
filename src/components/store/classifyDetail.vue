<template>
  <div class="wrapper">
    <div class="moduleHead">
      <a href="javascript:window.history.go(-1)"></a> {{cdl.title}}
    </div>
    <div class="cd-container">
      <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite">
        <ul>
          <li v-for="(cd, index) in cdl.cdList" :key="index">
          <router-link :to="/detail/+cd.id">
           <div class="cd-goods-img">
             <img :src="cdl.imgUrl + cd.default_img" alt="">
           </div>
            <p class="cd-goods-name">{{cd.name}}</p>
            <div class="goods-price"  v-if="cd.type == 1">
              <!--<p><i class="icon icon-x-integral"></i><span>{{cd.spec.points}}</span></p>-->
              <p><i class="icon icon-y-integral"></i><span style="color: #4f98f5">{{cd.spec.points}}</span></p>
              <p class="goods-price-rmb"><b><span style="color:#c3c3c3">¥</span><s style="color: #c3c3c3">{{cd.spec.ready}}</s></b></p>
            </div>
            <div class="goods-price-integral" v-if="cd.type == 2">
             <!-- <div>
                <p class="spec"><i class="icon icon-x-integral"></i><span>{{cd.spec.points}}</span></p>
                <u>+</u>
                <p><span class="price-rmb">¥</span>{{cd.spec.ready}}</p>
              </div>
              <div>
                <p class="spec"><i class="icon icon-y-integral"></i><span>{{cd.spec.points}}</span></p>
                <u>+</u>
                <p><span class="price-rmb">¥</span>{{cd.spec.ready}}</p>
              </div>-->
              <p class="goods-price-rmb" style="color: #c3c3c3"><u>市场价：</u><b><span>¥</span>{{cd.spec.market}}</b></p>
              <!--<div>
                  <p class="spec"><i class="icon icon-x-integral"></i><span>{{imz.spec.points}}</span></p>
                  <u>+</u>
                  <p><span class="price-rmb">¥</span>{{imz.spec.ready}}</p>
                </div>-->
              <h3>会员价：<span>现金 + 积分</span></h3>
              <div>
                <p><span class="price-rmb">¥</span>{{cd.spec.ready}}</p>
                <u>+</u>
                <p class="spec"><i class="icon icon-y-integral"></i><span>{{cd.spec.points}}</span></p>
              </div>
            </div>
            <div class="goods-price-rmbs" v-if="cd.type == 3">
             <p> ¥ <span>{{cd.spec.ready}}</span></p>
            </div>
          </router-link>
        </li>
        </ul>
        <p class="add-more" style="margin-top: .15rem" v-if="cdl.isMore"><mt-spinner type="triple-bounce"></mt-spinner></p>
        <p class="add-more" style="margin-top: .15rem" v-if="!cdl.isMore">没有更多了</p>
        <!--<p class="add-more" style="padding-top: .2rem" v-if="cdl.isMore">点击加载更多</p>-->
      </v-scroll>

    </div>
  </div>
</template>

<script>
  import api from '../../assets/js/api.js'
  import { imgUrl } from '../../assets/js/api.js'
  import { Toast } from 'mint-ui'
  import cache from '@/assets/js/catch.js'
  import Scroll from '../comp/scroll.vue';
  export default {
    name: "classify-detail",
    components : {
      'v-scroll': Scroll
    },
    data () {
      return {
        cdl: {
          title: this.$route.params.name,
          id: parseInt(this.$route.params.id),
          cdList: [],
          imgUrl: imgUrl,
          page: 1,
          isMore: false
        },
        cache: cache,
        comeId: parseInt(this.$route.params.id)
      };
    },
    methods: {
      getClassList () {
        api.getClassifyDetail({
          id: this.cdl.id,
          page: 1
        })
          .then(res => {
            // console.log(res)
            if (res.code === 200) {
              if (res.data.length < 10) {
                this.cdl.isMore = false;
              } else {
                this.cdl.isMore = true;
              }
              this.cdl.cdList = res.data;
            }
          })
      },
      onRefresh (done) {
        this.cache.remove('leaveCdl');
        setTimeout(() => {
          window.location.reload()
        },2000);
        done();
      },
      onInfinite (done) {
        if (this.cdl.isMore) {
          setTimeout(() => {
            this.cdl.page += 1;
            api.getClassifyDetail({
              id: this.cdl.id,
              page: this.cdl.page
            })
              .then(res => {
                if (res.code === 200) {
                  if (res.data.length === 0) {
                    Toast('到底了！！！');
                    this.$el.querySelector('.load-more').style.display = 'none';
                    this.cdl.isMore = false;
                  } else {
                    for (var i in res.data) {
                      this.cdl.cdList.push((res.data)[i]);
                    }
                    done();
                  }
                }
              })
          },2500)
        } else {
          this.$el.querySelector('.load-more').style.display = 'none';
        }
      }
    },
    created () {
      let cdlData = this.cache.getCache('leaveCdl');
      if (cdlData) {
        let c =parseInt((new Date().getTime())/1000);
        let proTime = c - cdlData.lt;
        let cacheId = cdlData.cd.id;
        if (proTime >= 3600 || this.comeId !== cacheId) {
          this.getClassList()
        } else {
          this.cdl = cdlData.cd;
        }
      } else {
        this.getClassList()
      }

    },
    beforeDestroy () {
      let cacheData  = this.cdl;
      let d = parseInt((new Date().getTime())/1000);
      this.cache.setCache('leaveCdl',{cd: cacheData,lt: d});
    },
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/classifyDetail";
</style>
