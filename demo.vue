<!------------------------
 *@name Vue.js
 *@author veaba
 *@date 2017/9/18
 *@desc level 1/2/3 => 省/市/县
 *@desc type [unit,address] 增加unit进来，目前只支持添加两类
 -------------------------->
<template>
  <div>
    <address-picker
      :value="location"
      :level="3" 
      :type="['unit','address']"
      @on-change="getChangeValue"
    ></address-picker>
  </div>
</template>

<script>
export default {
  name: "test",
  // v-model="location"
  data: function() {
    return {
      location: {
        province: "浙江",
        city: "",
        district: ""
      }
    };
  },
  created() {
    var a1 = [
      {
        name: "教育A",
        city: [
          {
            name: "教育B",
            area: ["教育局C-1", "教育司C-2"]
          }
        ]
      }
    ];
    var a2 = [
      {
        name: "教育甲",
        city: [
          {
            name: "教育乙",
            area: ["教育局丙-1", "教育司丙-2"]
          }
        ]
      }
    ];
    a1.splice(0, 0, ...a2);
    console.info(a1);
  },
  methods: {
    getChangeValue(location) {
      console.info(location);
    }
  }
};
</script>

<style scoped>
</style>
