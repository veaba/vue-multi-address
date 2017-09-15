/***********************
 *@name JS
 *@author veaba https://github.com/veaba
 *@date 2017/9/15
 ***********************/
var vueMultiAddress  = require('./src/lib/vue-address-picker.vue');

module.exports = function install (Vue) {
  Vue.component(vueMultiAddress.name, vueMultiAddress)
}
