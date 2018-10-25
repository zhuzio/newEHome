<template>
  <div class="wrapper">
    <div class="login-container" :style="{'height': height + 'px'}">
      <div class="login-center">
        <h1 class="login-title">新易家</h1>
        <div class="login-form">
          <div class="login-list"><span>账号</span><input type="number" placeholder="请输入您的账号"></div>
          <div class="login-list"><span>密码</span><input type="password" placeholder="请输入您的密码"></div>
          <button class="login-btn" @click="login">登录</button>
        </div>
        <p class="login-register">
          <span>忘记密码？</span>
          <router-link to="/register">
            <span>没有账号？立即注册</span>
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    data () {
      return {
        height: 0
      }
    },
    methods: {
      login () {

      }
    },
    created () {
      this.height = window.screen.availHeight;
      console.log(this.height)
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/login";
</style>
