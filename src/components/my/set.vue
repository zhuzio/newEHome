<template>
  <div class="wrapper">
    <div class="moduleHead">
      <a href="javascript:window.history.go(-1)"></a>设置
    </div>
    <div class="ser-container">
      <div class="set-center">
        <p class="set-title">个人信息</p>
        <p class="set-list"><span>登录账号</span><span>15236058819</span></p>
        <p class="set-list"><span>会员身份</span><span>合伙人</span></p>
        <p class="set-list"><span>真实姓名</span><span>陈予安</span></p>
      </div>
      <div class="set-center">
        <p class="set-title">安全设置</p>
        <p class="set-list"><span>银行卡管理</span><i class="icon icon-right"></i></p>
        <p class="set-list"><span>修改登录密码</span><i class="icon icon-right"></i></p>
        <p class="set-list"><span>修改支付密码</span><i class="icon icon-right"></i></p>
      </div>
      <button class="set-quit-login" @click="quitLogin">退出登录</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "set",
    data () {
      return {

      }
    },
    methods: {
      quitLogin () {
        this.$router.push('login')
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/set";
</style>
