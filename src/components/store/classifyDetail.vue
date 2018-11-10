<template>
  <div class="wrapper">
    <div class="moduleHead">
      <a href="javascript:window.history.go(-1)"></a> {{title}}
    </div>
  </div>
</template>

<script>
  import api from '../../assets/js/api.js'
  import { imgUrl } from '../../assets/js/api.js'
  export default {
    name: "classify-detail",
    data () {
      return {
        title: this.$route.params.name,
        id: this.$route.params.id,
      };
    },
    methods: {

    },
    created () {
      api.getClassifyDetail(this.id)
        .then(res => {
          console.log(res)
        })
    }
  }
</script>

<style scoped lang="less">
  
</style>
