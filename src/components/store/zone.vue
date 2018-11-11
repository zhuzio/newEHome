<template>
  <div class="wrapper">
    <div class="moduleHead">
      <a href="javascript:window.history.go(-1)"></a> {{title}}
    </div>
    <div class="cd-container">
      <ul>
        <li v-for="(zl, index) in zoneList" :key="index">
          <router-link :to="/detail/+zl.id">
            <img :src="imgUrl + zl.default_img" alt="">
            <p class="cd-goods-name">{{zl.name}}</p>
            <div class="goods-price"  v-if="zl.type == 1">
              <p><i class="icon icon-x-integral"></i><span>{{zl.spec.points}}</span></p>
              <p><i class="icon icon-y-integral"></i><span>{{zl.spec.points}}</span></p>
            </div>
            <div class="goods-price-integral" v-if="zl.type == 2">
              <div>
                <p class="spec"><i class="icon icon-x-integral"></i><span>{{zl.spec.points}}</span></p>
                <u>+</u>
                <p><span class="price-rmb">¥</span>{{zl.spec.ready}}</p>
              </div>
              <div>
                <p class="spec"><i class="icon icon-y-integral"></i><span>{{zl.spec.points}}</span></p>
                <u>+</u>
                <p><span class="price-rmb">¥</span>{{zl.spec.ready}}</p>
              </div>
            </div>
            <div class="goods-price-rmb" v-if="zl.type == 3">
              ¥ <span>{{zl.spec.ready}}</span>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import api from '../../assets/js/api.js'
  import { imgUrl } from '../../assets/js/api.js'
  import { Toast } from 'mint-ui'
  export default {
    name: "zone",
    data () {
      return {
        id: parseInt(this.$route.params.id),
        title: '',
        page: 1,
        zoneList: [],
        imgUrl: imgUrl
      };
    },
    methods: {

    },
    created () {
      switch (this.id) {
        case 1:
          this.title = '积分专区';
          break;
        case 2:
          this.title = '积分 + 现金专区';
          break;
        case 3:
          this.title = '现金专区';
          break;
      };
      api.getZone({
        page: this.page,
        type: this.id
      })
        .then(res => {
          if (res.code === 200) {
            this.zoneList = res.data;
          }
        })
    },
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/classifyDetail";
</style>
