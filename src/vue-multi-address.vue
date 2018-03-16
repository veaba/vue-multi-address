<!--
@author Jo.gel
@time 2017-9-18
@desc filterable 开始搜索模式 {Boolean}
@desc transfer 开启  body 调整 {Boolean}
@desc :value 是双向绑定的，所以，无需再使用事件回传，否则造成数据初始化，编辑时候无法添加上，因为每次使用on-change都会先执行
-->
<style>
.address-picker {
  display: flex;
  flex: 1
}

.ivu-select-selection {
  margin: 0 5px;
}
</style>

<template>
<div class='address-picker'>
  <Select @on-change="provinceEvent" v-model="value.province" :filterable="filterable" :transfer="transfer?transfer:false">
    <Option v-for="item in lib" :value="item.name" :key="item.name"></Option>
  </Select>
  <Select @on-change="cityEvent" v-if="level>1||!level" v-model="value.city" :filterable="filterable" :transfer="transfer?transfer:false">
    <Option v-for="item in cityList" :value="item.name" :key="item.name"></Option>
  </Select>
  <Select @on-change="districtEvent" v-if="level>2||!level" v-model="value.district" :filterable="filterable" :transfer="transfer?transfer:false">
    <Option v-for="item in districtList" :value="item" :key="item"></Option>
  </Select>
</div>
</template>

<script>
const addressJson = require('./address.js'); //地址库
const unitJson = require('./unit-json.js'); //unit 单位库
let allJson = []; //全部库的组合
export default {
  name: 'addressPicker',
  directives: {},
  /**
   * @desc level 1/2/3 => 省/市/县
   * @desc type 引入的库数组 [unit,address]
   */
  props: {
    type: {
      type: Array
    },
    value: {
      type: Object
    },
    level: {
      type: Number
    },
    transfer: {
      type: Boolean,
      default: false
    },
    filterable: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      lib: this.library(),
      province: this.value.province?this.value.province:'',
      city: this.value.city?this.value.city:'',
      district: this.value.district?this.value.district:''
    }
  },

  computed: {
    //计算出来市级即二级的列表
    cityList: function() {
      const thisProvince = this.province;
      let thisArr = this.lib.filter(function(index) {
        return index.name === thisProvince
      });
      return thisArr[0] ? thisArr[0].city : []
    },
    //计算出来县级即三级的列表
    districtList: function() {
      const thisCity = this.city;
      let thisArr = this.cityList.filter(function(index) {
        return index.name === thisCity
      });
      return thisArr[0] ? thisArr[0].area : []
    },
  },

  methods: {
    /**
     *@desc 渲染省份
     */
    library: function() {
      //1、判断type 字段
      if (this.type) {
        allJson=[];//需要置空导出数组，否则重绘多次会导致组件数据多次加载省份数据
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
            console.error('unit库为空或不存在，请添加库文件')
          }
        }
        if (addressString > -1 || (unitString === -1 && addressString === -1)) {
          if (addressJson.length > 0) {
            //找到unit库
            allJson.splice(allJson.length, 0, ...addressJson)
          } else {
            //没找到address 库
            console.error('address库为空或不存在，请添加库文件')
          }
        }
      }
      else {
        //默认无typeporps 则会调用address 库
        return addressJson
      }
      return allJson
    },

    /**
     *@desc 省份事件
     */
    provinceEvent(value) {
      this.province = value;
      this.city = '';
      this.district = '';
      if (this.level === 1) {
        this.$emit('on-change', {
          province: this.province,
        })
      } else if (this.level === 2) {
        this.$emit('on-change', {
          province: this.province,
          city: this.city,
        })
      } else if (this.level === 3) {
        this.$emit('on-change', {
          province: this.province,
          city: this.city,
          district: this.district
        })
      } else {
        this.$emit('on-change', {
          province: this.province,
          city: this.city,
          district: this.district
        })
      }

    },
    /**
     *@desc 城市事件
     */
    cityEvent(value) {
      this.city = value;
      this.district = '';
      if (this.level === 1) {
        this.$emit('on-change', {
          province: this.province,

        })
      } else if (this.level === 2) {
        this.$emit('on-change', {
          province: this.province,
          city: this.city,

        })
      } else if (this.level === 3) {
        this.$emit('on-change', {
          province: this.province,
          city: this.city,
          district: this.district
        })
      } else {
        this.$emit('on-change', {
          province: this.province,
          city: this.city,
          district: this.district
        })
      }
    },

    /**区县事件
     */
    districtEvent(value) {
      this.district = value;
      if (this.level === 1) {
        this.$emit('on-change', {
          province: this.province,

        })
      } else if (this.level === 2) {
        this.$emit('on-change', {
          province: this.province,
          city: this.city,

        })
      } else if (this.level === 3) {
        this.$emit('on-change', {
          province: this.province,
          city: this.city,
          district: this.district
        })
      } else {
        this.$emit('on-change', {
          province: this.province,
          city: this.city,
          district: this.district
        })
      }
    }

  }
}
</script>
