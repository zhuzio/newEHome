<template>
    <div class="wrapper">
      <div class="shop-car-container">
        <div class="shop-car-header"></div>
        <div class="shop-car-list-container">
          <div class="sc-store"></div>
        </div>
        <div class="shop-car-clear">

        </div>
      </div>
      <tabFoot></tabFoot>
    </div>
</template>

<script>
  import tabFoot from '../comp/tabFoot.vue'
  export default {
    name: "shop-car",
    components: {
      tabFoot
    },
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/shopCar";
</style>
