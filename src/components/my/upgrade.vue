<template>
  <div class="wrapper">
    <div class="moduleHead">
      <a href="javascript:window.history.go(-1)"></a>升级
    </div>
    <div class="up-container">
      <div class="up-head">
        <div class="up-now-grade">
          <h4>当前级别：</h4>
          <p>{{idDeg}}</p>
        </div>
        <div  class="up-grade-icon"></div>
        <div class="up-next-grade">
          <h4>下一级别：</h4>
          <p>{{upDeg}}</p>
        </div>
      </div>
      <div class="up-team">
        <div class="u-t-n">
          <h3>团队人数</h3>
          <p>{{teamNum}}<span>人</span></p>
        </div>
        <p class="u-t-l"></p>
        <div class="u-t-z">
          <h3>直推人数</h3>
          <p>{{straightPushNum}}<span>人</span></p>
        </div>
      </div>
      <div class="up-condition">
        <p class="u-c-t"><span>*</span>升级条件：</p>
        <p class="u-c-c">此次升级，团队人数需要达到 <span>20</span>人，直推人数需要达到 <span>10</span>人</p>
      </div>
      <div class="up-btn" @click="upgrade">确认升级</div>
    </div>
  </div>
</template>

<script>
  import api from '@/assets/js/api.js'
  let token = localStorage.getItem('token')
  export default {
    name: "upgrade",
    data () {
      return {
        teamNum: '',
        straightPushNum: '',
        upgradeType: '',
        userInfo: [],
        idDeg: '',
        upDeg: ''
      };
    },
    methods: {
      upgrade () {
        let form = this.$qs.stringify({
          token: token,
          apply_type: this.upgradeType
        });
        api.applyUpgrade(form)
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    created () {
      api.getTeamPerson()
        .then(res => {
          if (res.code === 200) {
            this.teamNum = res.data;
          };
        })
      api.getStraightPush()
        .then(res => {
          if (res.code === 200) {
            this.straightPushNum = res.data;
          };
        })
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
      switch (parseInt(this.userInfo.account_type)) {
        case 1:
          this.idDeg = '代理';
          this.upDeg = '区代';
          this.upgradeType = '2';
          break;
        case 2:
          this.idDeg = '区代';
          this.upDeg = '总代';
          this.upgradeType = '3';
          break;
        case 3:
          this.idDeg = '总代';
          this.upDeg = '联创';
          this.upgradeType = '4';
          break;
        case 4:
          this.idDeg = '联创';
          this.upDeg = '合伙人';
          this.upgradeType = '5';
          break;
        case 5:
          this.idDeg = '合伙人';
          break;
      };
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/upgrade";
</style>
