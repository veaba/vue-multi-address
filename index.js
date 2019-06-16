/***********************
 *@name JS
 *@author veaba https://github.com/veaba
 *@date 2017/9/15
 ***********************/
import vueMultiAddress from './src/vue-multi-address.vue'

const install = function install(Vue) {
  Vue.component(vueMultiAddress.name, vueMultiAddress)
}
export default install
