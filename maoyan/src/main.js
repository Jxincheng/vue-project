// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import  store from './store'
import './styles/reset.less' //引入全局配置样式

Vue.config.productionTip = false

import  Axios from 'axios' // 引入axios
Vue.prototype.$axios=Axios // axios 挂载到vue的实例上 这样他的拓展实例  组件也有$axios

import '../static/css/font-awesome.css'

//注册全局过滤器
Vue.filter('getImg', function (value) {
	let Img = value.replace("w.h","120.180");
    return  Img;
})
Vue.filter('getImg2', function (value) {
	let Img2 = value.replace("w.h","170.230");
    return  Img2;
})
Vue.filter('getImg3', function (value) {
  let Img3 = value.replace("w.h","148.208");
    return  Img3;
})
Vue.filter('getDates', function (value) {
	let reg = /\s[\u2E80-\u9FFF]{2}/gi;
	let Dates = value.replace(reg,"");
    return  Dates;
})
Vue.filter('getDates2', function (value) {
  let Dates = value.getMonth();
    return  Dates;
})
Vue.filter('getSnum', function (value) {
  let snum = (value/10000).toFixed(1);
    return  snum;
})
Vue.filter('getSc', function (value) {
  let sc = value.toFixed(1);
    return  sc;
})

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
