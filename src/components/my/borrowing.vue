<template>
  <div class="wrapper">
    <div class="moduleHead">
      <a href="javascript:window.history.go(-1)"></a>借贷
    </div>
    <div class="borrowing-container">
      <div class="borrowing-head">
        <h1 class="borrowing-head-title">借款金额</h1>
        <div class="borrowing-head-chose">
          <p><input type="radio" id="v1" name="borrow-num"><label for="v1">30000</label></p>
          <p><input type="radio" id="v2" name="borrow-num"><label for="v2">60000</label></p>
          <p><input type="radio" id="v3" name="borrow-num"><label for="v3">90000</label></p>
        </div>
      </div>
      <div class="borrowing-info">
        <h1 class="borrowing-head-title">个人信息</h1>
        <div class="borrowing-info-center">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
      name: "borrowing"
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/borrowing";
</style>
