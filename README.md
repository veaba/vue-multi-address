# vue-multi-address
- 多功能自定义拓展地址库，支持 数组type 不同类型的三级联库
- 强依赖iview 
## Tips非常重要
- 这个项目强依赖 于 https://github.com/iview/iview ，不然css 会Boooooooom啊
- 参考类型项目  https://github.com/G-Veigar/vue-address-picker
## install
```npm
还没制作npm包
```

## v-model 双向绑定
```vue
<address-picker v-model="location" :level="3" :type='["unit","address"]' @on-change="getChangeValue" ></address-picker>
```

```js
data: function() {
      return {
        location: {
          province: "浙江",
          city: "",
          district: "",
        }
      }
    },
```
## component被引用
```vue
<address-picker v-model="location" :level="3" :type='["unit","address"]' @on-change="getChangeValue"></address-picker>
```
## event 子组件返回值 

- @on-change return{Object}
```js

methods:{
  getChangeValue(location) {
    console.info(location);
  }
}

```
-
## props

- level {number}
```vue
	level 分为三级 1 2 3，
	level 1 则只会出现一个级联
	level 2 则只会出现两个级联
	level 3 则只会出现三个级联
	
```
- type {array}
```vue
	:type='["unit","address"]'
	
	目前只支持 两个类型库，需要的话，自己在源码里面增加以适应不同的场合
	如果空数组则default : address
```
- value {Object}(也可以使用v-model进行双向绑定)
支持value 传入默认值
```vue
	<address-picker :value="location" :level="3" :type='["unit","address"]' @on-change="getChangeValue" ></address-picker>

```
此时 在js 里面这样赋予默认值
```js
data: function() {
      return {
        location: {
          province: "浙江",
          city: "",
          district: "",
        }
      }
    },
```


## lib 库 格式
```json

module.exports={
	{ "name": "北京", "city": [{ "name": "北京", "area": ["东城区", "西城区", "崇文区", "宣武区", "朝阳区", "丰台区", "石景山区", "海淀区", "门头沟区", "房山区", "通州区", "顺义区", "昌平区", "大兴区", "平谷区", "怀柔区", "密云县", "延庆县"] }] },
	{ "name": "天津", "city": [{ "name": "天津", "area": ["和平区", "河东区", "河西区", "南开区", "河北区", "红桥区", "塘沽区", "汉沽区", "大港区", "东丽区", "西青区", "津南区", "北辰区", "武清区", "宝坻区", "宁河县", "静海县", "蓟  县"] }] },
}
```


