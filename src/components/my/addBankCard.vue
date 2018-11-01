<template>
  <div class="wrapper">
    <div class="moduleHead">
      <a href="javascript:window.history.go(-1)"></a>添加银行卡
    </div>
    <div class="abc-container">
      <div class="abc-list"><span class="abc-title">持卡人</span><input type="text" placeholder="请输入持卡人姓名" v-model="bank.name"></div>
      <div class="abc-list"><span class="abc-title">手机号</span><input type="number" placeholder="请输入预留手机号" v-model="bank.tel"></div>
      <div class="abc-list"><span class="abc-title">身份证号</span><input type="text" placeholder="请输入个人身份信息" v-model="bank.idNum"></div>
      <div class="abc-list"><span class="abc-title">银行卡号</span><input type="number" placeholder="请输入银行卡号" v-model="bank.bankNum"></div>
      <div class="abc-list" @click="getCardPop()"><span class="abc-title">开户行</span><input type="text" placeholder="请选择开户行" readonly disabled v-model="bank.bank"><i class="icon icon-right"></i></div>
      <div class="abc-list" @click="getCardPop()"><span class="abc-title">开户省份</span><input type="text" placeholder="请选择开户省份" readonly disabled v-model="bank.province"><i class="icon icon-right"></i></div>
      <div class="abc-list" @click="getCardPop()"><span class="abc-title">开户城市</span><input type="text" placeholder="请选择开户城市" readonly disabled v-model="bank.city"><i class="icon icon-right"></i></div>
      <div class="abc-list" @click="getCardPop()"><span class="abc-title">开户支行</span><input type="text" placeholder="请选择开户支行" readonly disabled v-model="bank.area"><i class="icon icon-right"></i></div>
    </div>
    <button class="abc-btn" @click="addBankCard()">确认添加</button>
    <mt-popup v-model="cardPop" position="bottom" class="abc-popup">
      <div class="abc-card-info">
        <div class="abc-chose-card">
          <p class="c-title">
            <span v-for="(bc, index) in bankChoseTitle" :key="index" :class="{'chose-on':index===choseIndex}" @click="titleOn(index)">{{bc}}</span>
          </p>
          <div class="bank-info-container">
            <div class="bank-info-center" :style="anName">
              <div class="bi-bank">
                <p v-for="(bi, index) in bankInfo" :key="index" @click="nextInfo(0, bi, index)" :class="{'ci-on':index===allCk}">{{bi.bank_name}}</p>
              </div>
              <div class="bi-pro">
                <p v-for="(bp, index) in bankPro" :key="index" @click="nextInfo(1, bp, index)" :class="{'ci-on':index===proCk}">{{bp.province}}</p>
              </div>
              <div class="bi-city">
                <p v-for="(bc, index) in bankCity" :key="index" @click="nextInfo(2, bc, index)" :class="{'ci-on':index===cityCk}">{{bc.area}}</p>
              </div>
              <div class="bi-dis">
                <p v-for="(bd, index) in bankDis" :key="index" @click="nextInfo(3, bd, index)" :class="{'ci-on':index===disCk}">{{bd.name}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
  import api from '@/assets/js/api.js'
  import { Toast } from 'mint-ui'
  let token = localStorage.getItem('token')
  export default {
    name: "add-bank-card",
    data () {
      return {
        cardPop: false,
        bankChoseTitle:['开户行','开户省份','开户城市','开户支行'],
        choseIndex:0,
        bankInfo: [],
        allCk: -1,
        choseBank: '',
        bankPro: [],
        proCk: -1,
        choseBankPro: '',
        bankCity: [],
        cityCk: -1,
        choseBankCity: '',
        bankDis: [],
        disCk: -1,
        choseBankDis: '',
        anName:'',
        an0:'transform: translateX(0rem);transition-duration: .5s;',
        an1:'transform: translateX(-3rem);transition-duration: .5s;',
        an2:'transform: translateX(-6rem);transition-duration: .5s;',
        bank:{
          name: '',
          tel: '',
          idNum: '',
          bankNum: '',
          bank: '',
          province: '',
          city: '',
          area: '',
          code: ''
        }
      }
    },
    methods: {
      titleOn (idx) {
        switch (idx) {
          case 0:
            this.anName = this.an0;
            break;
          case 1:
            if (this.bankCity.length === 0) {
              alert("请选择开户行");
              return false
            };
            this.anName = this.an1;
            break;
          case 2:
            if (this.bankDis.length === 0) {
              alert("请选择开户省份");
              return false
            };
            this.anName = this.an2;
            break;
          case 3:
            if (this.bankDis.length === 0) {
              alert("请选择开户城市");
              return false
            };
            break;
        }
        this.choseIndex = idx
      },
      nextInfo (idx, ele, index) {
        switch (idx) {
          case 0:
            this.choseBank = ele.bank_name;
            this.allCk = index;

            this.bankPro = [];
            this.proCk = -1;
            this.choseBankPro = '';

            this.bankCity = [];
            this.cityCk = -1;
            this.choseBankCity = '';

            this.bankDis = [];
            this.choseBankDis = '';

            api.getBankInfoPro(this.choseBank)
              .then(res => {
                if (res.code === 200) {
                  this.bankPro = res.data
                }
              })
              .catch(err => {
                console.log(err)
              });
            this.choseIndex = 1;
            break;
          case 1:
            this.choseBankPro = ele.province;
            this.proCk = index;
            this.anName = this.an1;

            this.bankCity = [];
            this.cityCk = -1;
            this.choseBankCity = '';

            this.bankDis = [];
            this.choseBankDis = '';
            api.getBankInfoCity({bank:this.choseBank, pro:this.choseBankPro})
              .then(res => {
                if (res.code === 200) {
                  this.bankCity = res.data
                }
              })
              .catch(err => {
                console.log(err)
              });

            this.choseIndex = 2;
            break;
          case 2:
            this.choseBankCity = ele.area;
            this.cityCk = index;
            this.anName = this.an2;

            this.bankDis = [];
            this.choseBankDis = '';
            api.getBankInfoDis({bank:this.choseBank, pro:this.choseBankPro, dis:this.choseBankCity})
              .then(res => {
                if (res.code === 200) {
                  this.bankDis = res.data
                }
              })
              .catch(err => {
                console.log(err)
              });

            this.choseIndex = 3;
            break;
          case 3:
            this.choseBankDis = ele.name;
            this.bank.code = ele.code;
            this.bank.bank = this.choseBank;
            this.bank.province = this.choseBankPro;
            this.bank.city =  this.choseBankCity;
            this.bank.area = this.choseBankDis;
            this.cardPop = false;
            break;
        }
      },
      getCardPop () {
        this.cardPop = true;
        this.bank.bank = '';
        this.bank.province = '';
        this.bank.city =  '';
        this.bank.area = '';
        this.bankPro = [];
        this.bankCity = [];
        this.bankDis = [];
        this.anName = this.an0;
        this.choseIndex = 0;
        this.allCk = -1;
      },
      addBankCard () {
        if (!this.bank.name) {
          Toast("持卡人姓名不能为空！");
          return false;
        };
        if (!this.bank.tel) {
          Toast("手机号不能为空！");
          return false;
        };
        if (!this.bank.idNum) {
          Toast("请输入身份证号码！");
          return false;
        };
        if (!this.bank.bankNum) {
          Toast("请输入银行卡号！");
          return false;
        };
        if (!this.bank.bank) {
          Toast("请选择开户行！");
          return false;
        };
        if (!this.bank.province) {
          Toast("请选择开户省份！");
          return false;
        };
        if (!this.bank.city) {
          Toast("请选择开户城市！");
          return false;
        };
        if (!this.bank.area) {
          Toast("请选择开户支行！");
          return false;
        };
        let form = this.$qs.stringify({
          token: token,
          bank:this.bank.bank,
          account: this.bank.name,
          id_number: this.bank.idNum,
          phone: this.bank.tel,
          card: this.bank.bankNum,
          bank_code_name: this.bank.area,
          bank_code: this.bank.code
        });
        api.addBank(form)
          .then(res => {
            console.log(res)
            if (res.code === 200) {
              Toast({
                message: '添加成功',
                position: 'center',
                duration: 2000
              })
              setTimeout(() => {
                window.history.go(-1)
              },2500)
            } else {
              Toast(res.msg);
            }
          })
          .catch(err => {
            console.log(err)
          })

      }
    },
    created () {
      api.getBankInfo()
        .then(res => {
          if (res.code === 200) {
            this.bankInfo=res.data;
          }
        })
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/addBankCard";
</style>
