<!-------------------------------
*@author veaba https://github.com/veaba
*@time 2017-9-15
-------------------------------->
<template>
  <div class='address-picker'>

    <!--省份-->
    <div class="ivu-select ivu-select-single" :class="{'ivu-select-visible':selectProvinceStatus}" @click.stop="openSelectProvince"
         v-clickoutside="handleProvinceClose"
         :style="{width:level==1?'100%':(level==2?'50%':(level==3?'31%':'100%'))}">
      <div class="ivu-select-selection">
        <span class="ivu-select-placeholder" v-show="!province">请选择</span>
        <span class="ivu-select-selected-value" v-show="province">{{province}}</span>
        <i class="ivu-icon ivu-icon-ios-close ivu-select-arrow" style="display: none;"></i>
        <i class="ivu-icon ivu-icon-arrow-down-b ivu-select-arrow"></i>
      </div>
      <div class="ivu-select-dropdown" v-show="selectProvinceStatus" :style="styles">
        <ul class="ivu-select-dropdown-list">
          <li v-for="item in lib" class="ivu-select-item" :class="{'ivu-select-item-selected':province==item.name}"
              @click="selectProvince(item.name)">{{item.name}}
          </li>
        </ul>
      </div>
    </div>

    <!--市级-->
    <div class="ivu-select ivu-select-single" :class="{'ivu-select-visible':selectCityStatus}" @click.stop="openSelectCity"
         v-clickoutside="handleCityClose"
         :style="{width:level==1?'100%':(level==2?'50%':(level==3?'31%':'100%'))}">
      <div class="ivu-select-selection">
        <span class="ivu-select-placeholder" v-show="!city">请选择</span>
        <span class="ivu-select-selected-value" v-show="city">{{city}}</span>
        <i class="ivu-icon ivu-icon-ios-close ivu-select-arrow" style="display: none;"></i>
        <i class="ivu-icon ivu-icon-arrow-down-b ivu-select-arrow"></i>
      </div>
      <div class="ivu-select-dropdown" v-show="selectCityStatus" :style="styles">
        <ul class="ivu-select-dropdown-list">
          <li v-for="item in cityList" class="ivu-select-item" :class="{'ivu-select-item-selected':city==item.name}"
              @click="selectCity(item.name)">{{item.name}}
          </li>
        </ul>
      </div>
    </div>

    <!--地级-->
    <div class="ivu-select ivu-select-single" :class="{'ivu-select-visible':selectDistrictStatus}" @click.stop="openSelectDistrict"
         v-clickoutside="handleDistrictClose"
         :style="{width:level==1?'100%':(level==2?'50%':(level==3?'31%':'100%'))}">
      <div class="ivu-select-selection">
        <span class="ivu-select-placeholder" v-show="!district">请选择</span>
        <span class="ivu-select-selected-value" v-show="district">{{district}}</span>
        <i class="ivu-icon ivu-icon-ios-close ivu-select-arrow" style="display: none;"></i>
        <i class="ivu-icon ivu-icon-arrow-down-b ivu-select-arrow"></i>
      </div>
      <div class="ivu-select-dropdown" v-show="selectDistrictStatus" :style="styles">
        <ul class="ivu-select-dropdown-list">
          <li v-for="item in districtList" class="ivu-select-item" :class="{'ivu-select-item-selected':district==item}"
              @click="selectDistrict(item)">{{item}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import clickoutside from './lib/clickoutside.js'; //外点击事件
  const addressJson = require('./lib/address.js')
  const unitJson = require('./lib/unit-json.js')
  const allJson = [] //全部库的组合

  export default {
    name: 'addressPicker',
    directives: {
      clickoutside
    },
    data() {
      return {
        model1: '',
        lib: this.library(),
        province: '',
        city: '',
        district: '',
        selectProvinceStatus: false,
        selectCityStatus: false,
        selectDistrictStatus: false,
        screenWidth: '100%'   // 这里是给到了一个默认值 （这个很重要）
      }
    },
    computed: {
      /*
      * @desc 下拉宽度
      * */
      styles() {
        let style = {};
        if (this.screenWidth) style.width = `${this.screenWidth}px`;
        return style;
      },
      //计算出来省份即一级的列表
      provinceList: function () {

      },
      //计算出来市级即二级的列表
      cityList: function () {
        const thisProvince = this.province
        let thisArr = this.lib.filter(function (index) {
          return index.name == thisProvince
        })
        return thisArr[0] ? thisArr[0].city : []
      },
      //计算出来县级即三级的列表
      districtList: function () {
        const thisCity = this.city;
        let thisArr = this.cityList.filter(function (index) {
          return index.name == thisCity
        })
        return thisArr[0] ? thisArr[0].area : []
      }

    },
    /**
     * @desc level 1/2/3 => 省/市/县
     * @desc type 引入的库数组 [unit,address]
     */
    props: ['opts', 'level', 'type'],
    created() {

    },

    methods: {
      /**
       * @desc 库文件
       * */
      library: function () {
        //1、判断type 字段
        if (this.type) {
          //2、存在且返回index 、否则返回 -1 indexOf 和IE有兼容性问题
          let unitString = this.type.indexOf('unit');
          let addressString = this.type.indexOf('address');
          //3、如果存在，则找他们的库，并结合起来
          if (unitString > -1) {
            if (unitJson.length > 0) {
              //找到unit 库
              allJson.splice(allJson.length, 0, ...unitJson)
            } else {
              //没找到unit 库
              console.log('unit库为空或不存在，请添加库文件')
            }
          }
          if (addressString > -1 || (unitString == -1 && addressString == -1)) {
            if (addressJson.length > 0) {
              //找到unit库
              allJson.splice(allJson.length, 0, ...addressJson)
            } else {
              //没找到address 库
              console.log('address库为空或不存在，请添加库文件')
            }
          }
        }
        return allJson
      },
      /**
       * @desc 选择省份
       * */
      selectProvince(_province) {
        this.province = _province
        this.city='';
        this.district=''
        this.$emit('on-change',{
          province:this.province,
          city:this.city,
          district:this.district
        })
      },

      /**
       * @desc 选择市级
       * */
      selectCity(_city) {
        this.city = _city
        this.district=''
        this.$emit('on-change',{
          province:this.province,
          city:this.city,
          district:this.district
        })
      },
      /**
       * @desc 选择县级
       * */
      selectDistrict(_district) {
        this.district = _district
        this.$emit('on-change',{
          province:this.province,
          city:this.city,
          district:this.district
        })
      },

      /**
       * @desc 省级关闭
       * */
      handleProvinceClose() {
        this.selectProvinceStatus = false
      },
      /**
       * @desc 市级关闭
       * */
      handleCityClose() {
        this.selectCityStatus = false
      },
      /**
       * @desc 县级关闭
       * */
      handleDistrictClose() {
        this.selectDistrictStatus = false
      },

      /**
       *@desc 省级触发下拉事件
       */
      openSelectProvince(){
        this.selectProvinceStatus = !this.selectProvinceStatus
      },
      /**
       * @desc 市级触发下拉事件
       * */
      openSelectCity(){
        this.selectCityStatus=!this.selectCityStatus
      },

      /**
       * @desc 县级触发下拉事件
       * */
      openSelectDistrict(){
        this.selectDistrictStatus=!this.selectDistrictStatus
      }

    },
    watch: {
      screenWidth(val) {
        if (!this.timer) {
          this.screenWidth = val
          this.timer = true
          let that = this
          setTimeout(function () {
            that.timer = false
          }, 400)
        }
      }
    },
    mounted: function () {
      const _that = this
      window.onresize = () => {
        return (() => {
          window.screenWidth = document.getElementsByClassName('ivu-select')[0].clientWidth;
          _that.screenWidth = window.screenWidth
        })()
      }
      this.screenWidth = document.getElementsByClassName('ivu-select')[0].clientWidth;

    },

  }
</script>

<style lang="scss" scoped>
  .address-picker {
  }
</style>

