<template>
    <div class="wrapper">
        <div class="moduleHead">
            <a href="javascript:window.history.go(-1)"></a>可用积分转账
        </div>
        <div class="UITContainer">
            <p>您的可用积分为：<span>{{UInte}}</span></p>
            <p>可转积分为：<span>{{useUInt}}</span></p>
            <p>请输入转账金额：</p>
            <div class="UITMoney">
                <span>金额：</span><input type="number" v-model="TransferMonry">
            </div>
            <p>请输入转账账号：</p>
            <div class="UITMoney">
                <span>账号：
                </span><input type="number" v-model="TransferAccount">
            </div>
            <p>请输入短信验证码：</p>
            <div class="UITMoney">
                <span>验证码：</span>
                <input type="number" class="UITACC" v-model="TransferCode">
                <i class="UITGetPho" @click="GetUITCode" :class="{'UITGetPhoSend': send}">{{verificationCodeTxt}}</i>
            </div>
            <button class="UITButton" @click="UITransfer">确认转账</button>
        </div> 
    </div>
</template>
<script>
  import api from '@/assets/js/api.js'
  import { Toast } from 'mint-ui'
import { setTimeout } from 'timers';
  let token = localStorage.getItem('token')
  export default {
    name: "useable-integral-transfer",
    data () {
        return {
            UInte: 0,
            useUInt: 0,
            TransferMonry: '',
            TransferAccount: '',
            TransferCode: '',
            verificationCodeTxt:'获取验证码',
            send: false,
        }
    },
    methods: {
        ctimer (time) {
            var t = time
            var that = this
            if (t > 0) {
                this.send = true
                this.verificationCodeTxt = t + 's后重发'
                t--
                setTimeout(function () {
                    that.ctimer(t)
                }, 1000)
            } else {
                this.send = false
                this.verificationCodeTxt = '获取验证码'
            }
        },
        GetUITCode () {
            if (!this.TransferMonry) {
                 Toast('请输入转账金额！');
                return false;
            };
            if (!this.TransferAccount) {
                 Toast('请输入转账账号！');
                return false;
            };
            if (this.send) {
                Toast('请稍后点击！');
                return false;
            } else {
                api.UITGetPhoneCode(token)
                    .then(res => {
                        console.log(res);
                        if (res.code === 200) {
                            Toast(res.msg);
                        } else{
                            Toast(res.msg);
                        }
                    })
                this.ctimer(60); 
            }
        },
        UITransfer () {
           if (!this.TransferMonry) {
                 Toast('请输入转账金额！');
                return false;
            };
            if (!this.TransferAccount) {
                 Toast('请输入转账账号！');
                return false;
            };
            if (!this.TransferCode) {
                 Toast('请输入短信验证码！');
                return false;
            };
            let TFrom = this.$qs.stringify({
                token: token,
                transfer_to: this.TransferAccount,
                money: this.TransferMonry,
                code: this.TransferCode
            })
            api.UITransferApi (TFrom)
                .then(res => {
                    if (res.code === 200) {
                        Toast(res.msg);
                        setTimeout(function(){
                            window.history.go(-1)
                        },1500)
                    } else{
                        Toast(res.msg);
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },
    created () {
        api.availableIntegral()
            .then(res => {
                if (res.code === 200) {
                    this.UInte = res.data.ready_points;
                    this.useUInt = this.UInte.split('.')[0];
                } else {
                    Toast(res.msg);
                }
            })
            .catch(err => {
                console.log(err)
            })
    },

    }
</script>
<style scoped lang="less">
  @import "../../assets/less/useableIntegralTransfer";
</style>
