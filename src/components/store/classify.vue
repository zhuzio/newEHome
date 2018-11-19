
<template>
    <div class="wrapper">
      <div class="search-container">
        <router-link to="/search"><span class="search-input"><i class="icon icon-search"></i><u>输入关键字</u></span></router-link><span class="search-button fr">搜索</span>
      </div>
      <div class="classify-tab-container">
        <div class="tab-head">
          <ul :style="{'width': width + 'rem'}">
            <li v-for="(tn, index) in tabName" :key="index" :class="{'tab-on':index === tabIdx}" @click="tabChange(tn,index)"><span>{{tn.name}}</span></li>
          </ul>
        </div>
        <div class="tab-container">
          <p class="tab-container-title">{{tabTxt}}专区</p>
          <div class="tab-container-center">
            <ul>
              <li v-for="(dd, index) in classifyDetail" :key="index">
                <!--<router-link :to="{path:'/classifyDetail', params:{name:dd.name}}">-->
                <router-link :to="/classifyDetail/+dd.name+'/'+dd.id">
                  <img :src="imgUrl+dd.img" :alt="dd.name">
                  <p class="fr">{{dd.name}}</p>
                </router-link>
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
  import api from '../../assets/js/api.js'
  import { imgUrl } from '../../assets/js/api.js'
  export default {
    name: "classify",
    components: {
      tabFoot
    },
    data() {
      return {
        imgUrl: imgUrl,
        tabName: [],
        width: 0,
        tabIdx: 0,
        tabTxt: '',
        firstId: '',
        classifyDetail: []
      }
    },
    methods: {
      tabChange (ele, idx) {
        this.tabIdx = idx;
        this.tabTxt = ele.name;
        this.getClassifyDetail(ele.id)
      },
      getClassifyDetail (id) {
        api.getClassify(id)
          .then(res => {
            if (res.code === 200) {
              this.classifyDetail = res.data;
            }
        })
      }
    },
    created() {
      localStorage.removeItem('confirmAddress');
      api.getClassify(0)
        .then(res => {
          this.tabName = res.data;
          this.tabTxt = this.tabName[0].name;
          this.firstId = this.tabName[0].id;
          this.width = (this.tabName.length) * 0.9;
          this.getClassifyDetail(this.firstId)
        });


    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/classify.less";
</style>
