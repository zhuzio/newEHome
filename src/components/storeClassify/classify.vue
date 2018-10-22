
<template>
    <div class="wrapper">
      <div class="search-container">
        <span class="search-input"><i class="icon icon-search"></i><u>输入关键字</u></span><span class="search-button fr">搜索</span>
      </div>
      <div class="classify-tab-container">
        <div class="tab-head">
          <ul :style="{'width': width + 'rem'}">
            <li v-for="(tn, index) in tabName" :key="index" :class="{'tab-on':index === tabIdx}" @click="tabChange(tn,index)"><span>{{tn}}</span></li>
          </ul>
        </div>
        <div class="tab-container">
          <p class="tab-container-title">{{tabTxt}}专区</p>
          <div class="tab-container-center">
            <ul>
              <li>
                <img src="../../assets/images/f1.png" alt="">
                <p class="fr">早秋外套</p>
              </li>
              <li>
                <img src="../../assets/images/f2.png" alt="">
                <p class="fr">羊绒大衣</p>
              </li>
              <li>
                <img src="../../assets/images/f3.png" alt="">
                <p class="fr">早秋外套</p>
              </li>
              <li>
                <img src="../../assets/images/f4.png" alt="">
                <p class="fr">羊绒大衣</p>
              </li>
              <li>
                <img src="../../assets/images/f5.png" alt="">
                <p class="fr">早秋外套</p>
              </li>
              <li>
                <img src="../../assets/images/f6.png" alt="">
                <p class="fr">羊绒大衣</p>
              </li>
              <li>
                <img src="../../assets/images/f1.png" alt="">
                <p class="fr">早秋外套</p>
              </li>
              <li>
                <img src="../../assets/images/f2.png" alt="">
                <p class="fr">羊绒大衣</p>
              </li>
              <li>
                <img src="../../assets/images/f3.png" alt="">
                <p class="fr">早秋外套</p>
              </li>
              <li>
                <img src="../../assets/images/f4.png" alt="">
                <p class="fr">羊绒大衣</p>
              </li>
              <li>
                <img src="../../assets/images/f5.png" alt="">
                <p class="fr">早秋外套</p>
              </li>
              <li>
                <img src="../../assets/images/f6.png" alt="">
                <p class="fr">羊绒大衣</p>
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
  export default {
    name: "classify",
    components: {
      tabFoot
    },
    data() {
      return {
        tabName: ['女装','男装','女鞋','男鞋','童装','电器','家具','电子','零食'],
        width: 0,
        tabIdx: 0,
        tabTxt: ''
      }
    },
    methods: {
      tabChange (ele, idx) {
        this.tabIdx = idx
        this.tabTxt = ele
      }
    },
    created() {
      this.tabTxt = this.tabName[0]
      this.width = (this.tabName.length) * 0.9
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/classify.less";
</style>
