<template>
  <div class="wrapper">
    <div class="moduleHead">
      <a href="javascript:window.history.go(-1)"></a> {{title}}
    </div>
    <div class="cd-container">
      <ul>
        <li v-for="(cd, index) in cdList" :key="index">
          <router-link :to="/detail/+cd.id">
           <div class="cd-goods-img">
             <img :src="imgUrl + cd.default_img" alt="">
           </div>
            <p class="cd-goods-name">{{cd.name}}</p>
            <div class="goods-price"  v-if="cd.type == 1">
              <!--<p><i class="icon icon-x-integral"></i><span>{{cd.spec.points}}</span></p>-->
              <p><i class="icon icon-y-integral"></i><span>{{cd.spec.points}}</span></p>
              <p class="goods-price-rmb"><b><span style="color:#ff3b30">¥</span>{{cd.spec.ready}}</b></p>
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
              <p class="goods-price-rmb"><u>市场价：</u><b><span>¥</span>{{cd.spec.market}}</b></p>
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
      <p class="add-more" style="padding-top: .2rem" @click="classAdd" v-if="isMore">点击加载更多</p>
    </div>
  </div>
</template>

<script>
  import api from '../../assets/js/api.js'
  import { imgUrl } from '../../assets/js/api.js'
  import { Toast } from 'mint-ui'
  export default {
    name: "classify-detail",
    data () {
      return {
        title: this.$route.params.name,
        id: this.$route.params.id,
        cdList: [],
        imgUrl: imgUrl,
        page: 1,
        isMore: false
      };
    },
    methods: {
      classAdd () {
        this.page += 1;
        api.getClassifyDetail({
          id: this.id,
          page: this.page
        })
          .then(res => {
            if (res.code === 200) {
              if (res.data.length !== 0) {
                for (var i in res.data) {
                  this.cdList.push((res.data)[i]);
                }
              } else {
                Toast('到底了！！！');
                this.isMore = false;
              }
            }
          })
      }
    },
    created () {
      api.getClassifyDetail({
        id: this.id,
        page: this.page
      })
        .then(res => {
          // console.log(res)
          if (res.code === 200) {
            if (res.data.length < 10) {
              this.isMore = false;
            } else {
              this.isMore = true;
            }
            this.cdList = res.data;
          }
        })
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/classifyDetail";
</style>
