<template>
    <div class="wrapper">
         <div class="moduleHead">
            <a href="javascript:window.history.go(-1)"></a>可用积分转账记录
        </div>
        <div class="UITTotal">
                <p class="uittitle">
                    <span v-if="way === 1">转账总收入：</span>
                    <span v-if="way === 0">转账总支出：</span>
                </p>
                <p class="uitdata">
                    <span v-if="way === 1"><i>+ </i>{{income}}</span>
                    <span v-if="way === 0"><i>- </i>{{expend}}</span>
                </p>
        </div>
        <div class="hc-container">
            <div class="hc-list" v-for="(ui, index) in UITList" :key="index">
                <div v-if="way === 0">
                    <p class="hc-aaa"><span>对方账号：</span><span>{{ui.to.account}}</span></p>
                    <p class="hc-aaa hc-aaa-s"><span>对方姓名：</span><span>{{ui.to.realname}}</span></p>
                    <p class="hc-aaa"><span>对方手机号：</span><span>{{ui.to.phone}}</span></p>
                </div>
                <div v-if="way === 1">
                    <p class="hc-aaa"><span>对方账号：</span><span>{{ui.from.account}}</span></p>
                    <p class="hc-aaa"><span>对方姓名：</span><span>{{ui.from.realname}}</span></p>
                    <p class="hc-aaa"><span>对方手机号：</span><span>{{ui.from.phone}}</span></p>
                </div>
                <p class="hc-time"><span class="hc-sub">创建时间</span> <span class="hc-time-txt">{{ui.created_at}}</span></p>
                <p class="hc-num">
                    <span class="hc-order-sn">交易数值：</span>
                    <span class="hc-order-num" v-if="way === 0">- <i>{{ui.money}}</i></span>
                    <span class="hc-order-num" v-if="way === 1">+ <i>{{ui.money}}</i></span>
                </p>
            </div>
            <div class="container-no-data" v-if="isNo">
                <img src="../../assets/images/no_data.png" alt="">
                <p class="no-data-txt2">您还没有此项列表数据</p>
            </div>
            <p class="add-more" v-if="isMore" @click="addM">点击加载更多</p>
    </div>
    </div>
</template>
<script>
    import api from '@/assets/js/api.js'
    import { Toast } from 'mint-ui'
    import { truncate, truncateSync } from 'fs';
    let token = localStorage.getItem('token')
    export default {
        data () {
            return {
                UITList: [],
                isNo: false,
                isMore: false,
                way: parseInt(this.$route.params.way),
                page: 1,
                income: 0,
                expend: 0
            }
        },
        created () {
             let info = {
                page: this.page,
                token: token
            };
            switch (this.way) {
                case 0:
                    info.form = 'transfer_out';
                    break;
                case 1:
                    info.form = 'transfer_in';
                    break;
            };
            this.getUITRData(info);
        },
        methods: {
            addM () {
                this.page += 1;
                let AInfo = {
                    token: token
                };
                AInfo.page = this.page;
                switch (this.way) {
                case 0:
                    AInfo.form = 'transfer_out';
                    break;
                case 1:
                    AInfo.form = 'transfer_in';
                    break;
            };
            this.getUITRData(AInfo);
            },
            getUITRData (info) {
                if (info.page == 1) {
                    api.UITransferRecord(info)
                        .then(res => {
                            if (res.code === 200) {
                                this.income = res.total_transfer_in;
                                this.expend = res.total_transfer_out;
                                if (res.data != '') {
                                    if (res.data.length <= 9) {
                                        this.UITList = res.data;
                                    } else {
                                        this.UITList = res.data;
                                        this.isMore = true;
                                    } 
                                } else {
                                    this.isNo = true;
                                }
                            } else {
                                Toast(res.msg);
                            }
                        })
                } else {
                    api.UITransferRecord(info)
                        .then(res => {
                            if (res.code === 200){
                                if (res.data != ''){
                                    for (var i in res.data) {
                                        this.UITList.push(res.data[i]);
                                    };
                                } else {
                                    this.isMore = false;
                                    Toast('没有更多了...')
                                }
                            } else {
                                Toast(res.msg);
                            }
                        })
                }
            }
        }
    }
</script>
<style scoped lang="less">
  @import "../../assets/less/haveConversion";
  .hc-container {
      margin-top: 1.6rem;
      .hc-sub{
          font-style: normal!important;
          color: #999!important;
      }
      .hc-aaa-s{
          span{
              color: #4f98f5;
          }
          
      }
  }
  .UITTotal{
      width: 94%;
      padding: 0.2rem 3%;
      position: fixed;
      top: .8rem;
      border-top: 1px #ccc solid;
      left: 0;
      background: white;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      .uittitle{
          font-size: .25rem;
          padding-left: .2rem;
          letter-spacing: 1px;
      }
      .uitdata{
            font-size: .3rem;
            font-weight: bolder;
            color: red;
      }
  }
</style>
