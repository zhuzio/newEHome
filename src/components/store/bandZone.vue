<template>
  <div class="wrapper">
    <div class="moduleHead">
      <a href="javascript:window.history.go(-1)"></a>{{band.name}}
    </div>
    <div class="bz-container">
      <div class="bz-head">
        <div class="bz-img">
          <img :src="imgUrl+band.logo" :alt="band.name">
        </div>
        <div class="bz-info">
          <p class="bz-name">{{band.name}}</p>
          <p class="bz-des">{{band.desc}}</p>
        </div>
      </div>
      <ul v-if="!isNo" class="bz-goods-container">
        <li class="bz-goods" v-for="(bz, index) in bzList" :key="index">
          <router-link :to="/detail/+bz.id">
            <img :src="imgUrl + bz.default_img" :alt="bz.name">
            <p class="bz-goods-name">{{bz.name}}</p>
            <div class="goods-price"  v-if="bz.type == 1">
              <p><i class="icon icon-x-integral"></i><span>{{bz.spec.points}}</span></p>
              <p><i class="icon icon-y-integral"></i><span>{{bz.spec.points}}</span></p>
            </div>
            <div class="goods-price-integral" v-if="bz.type == 2">
              <div>
                <p class="spec"><i class="icon icon-x-integral"></i><span>{{bz.spec.points}}</span></p>
                <u>+</u>
                <p><span class="price-rmb">¥</span>{{bz.spec.ready}}</p>
              </div>
              <div>
                <p class="spec"><i class="icon icon-y-integral"></i><span>{{bz.spec.points}}</span></p>
                <u>+</u>
                <p><span class="price-rmb">¥</span>{{bz.spec.ready}}</p>
              </div>
            </div>
            <div class="goods-price-rmb" v-if="bz.type == 3">
              ¥ <span>{{bz.spec.ready}}</span>
            </div>
          </router-link>
        </li>
      </ul>
      <div class="container-no-data" v-if="isNo">
        <img src="../../assets/images/no_data.png" alt="">
        <p class="no-data-txt2">此店铺还没有上传商品，请浏览其他店铺 ~</p>
      </div>
      <p class="add-more" v-if="addM" @click="bzAdd">点击加载更多</p>
    </div>
  </div>
</template>

<script>
  import api from '../../assets/js/api.js'
  import { imgUrl } from '../../assets/js/api.js'
  import { Toast } from 'mint-ui'
    export default {
      name: "band-zone",
      data () {
        return {
          id: this.$route.params.id,
          page: 1,
          band: [],
          addM: false,
          bzList: [],
          isNo: false,
          imgUrl: imgUrl
        };
      },
      methods: {
        bzAdd () {
          this.page += 1;
          api.bandZone({
            page: this.page,
            id: this.id
          })
            .then(res => {
              if (res.data.goods.length === 0) {
                // this.isNo = true;
                this.addM = false;
                Toast('到底了......');
                this.page = this.page - 1;
              } else {
                for (var i in res.data.goods) {
                  this.bzList.push((res.data.goods)[i]);
                };
              };
            });
        }
      },
      created () {
        api.bandZone({
          page: this.page,
          id: this.id
        })
          .then(res => {
            if (res.data.goods.length === 0) {
              this.isNo = true;
              this.addM = false;
            } else if (res.data.goods.length >= 10) {
              this.addM = true;
              this.isNo = false;
            } else {
              this.addM = false;
              this.isNo = false;
            };
            this.band = res.data.brand;
            this.bzList = res.data.goods;
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
</script>

<style scoped lang="less">
  @import "../../assets/less/band";
</style>
