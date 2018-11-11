<template>
  <div class="wrapper">
    <div class="moduleHead">
      <a href="javascript:window.history.go(-1)"></a> {{title}}
    </div>
    <div class="cd-container">
      <ul>
        <li v-for="(cd, index) in cdList" :key="index">
          <router-link :to="/detail/+cd.id">
            <img :src="imgUrl + cd.default_img" alt="">
            <p class="cd-goods-name">{{cd.name}}</p>
            <div class="goods-price"  v-if="cd.type == 1">
              <p><i class="icon icon-x-integral"></i><span>{{cd.spec.points}}</span></p>
              <p><i class="icon icon-y-integral"></i><span>{{cd.spec.points}}</span></p>
            </div>
            <div class="goods-price-integral" v-if="cd.type == 2">
              <div>
                <p class="spec"><i class="icon icon-x-integral"></i><span>{{cd.spec.points}}</span></p>
                <u>+</u>
                <p><span class="price-rmb">¥</span>{{cd.spec.ready}}</p>
              </div>
              <div>
                <p class="spec"><i class="icon icon-y-integral"></i><span>{{cd.spec.points}}</span></p>
                <u>+</u>
                <p><span class="price-rmb">¥</span>{{cd.spec.ready}}</p>
              </div>
            </div>
            <div class="goods-price-rmb" v-if="cd.type == 3">
              ¥ <span>{{cd.spec.ready}}</span>
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
    name: "classify-detail",
    data () {
      return {
        title: this.$route.params.name,
        id: this.$route.params.id,
        cdList: [],
        imgUrl: imgUrl
      };
    },
    methods: {

    },
    created () {
      api.getClassifyDetail(this.id)
        .then(res => {
          console.log(res)
          if (res.code === 200) {
            this.cdList = res.data;
          }
        })
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/classifyDetail";
</style>
