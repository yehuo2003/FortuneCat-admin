import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

import zoomUI from 'zoom-ui-1.0';
Vue.use(zoomUI);

import '../node_modules/zoom-ui-1.0/lib/zoom-ui-1.0.css'


// 懒加载图片
import Lazyload from './lazyLoad.js'
// Vue.use(LazyLoad);
// 参数均为可选
Vue.use(Lazyload,{
  scrollDistance: 15, // 距离可视区还有15px时开发加载资源
  // defaultImage: 'https://gw.alicdn.com/tps/i1/TB147JCLFXXXXc1XVXXxGsw1VXX-112-168.png', // 资源图片未加载前的默认图片（绝对路径）
  // errorImage:'https://gw.alicdn.com/tps/i1/TB147JCLFXXXXc1XVXXxGsw1VXX-112-168.png' // 资源图片加载失败时要加载的资源（绝对路径）
 })

// 插件和全局对象的设置
Vue.use(ElementUI) //注册ElementUI插件
Vue.prototype.$axios = axios //把axios设置为所有Vue组件实例的成员属性，以后可以使用this.$axios使用异步请求功能
Vue.config.productionTip = false

// 创建全局过滤器
Vue.filter('date', (val) => {
  // 把bigint转换为yyyy-mm-dd
  var date = new Date(val)
  var yy = date.getFullYear()
  var mm = date.getMonth() + 1
  mm = mm > 9 ? mm : '0' + mm
  var dd = date.getDate()
  dd = dd > 9 ? dd : '0' + dd
  return yy + '-' + mm + '-' + dd
})
Vue.filter('datetime', (val) => {
  // 把bigint转换为yyyy-mm-dd hh:mm:ss
  var date = new Date(val)
  var yy = date.getFullYear()
  var mm = date.getMonth() + 1
  mm = mm > 9 ? mm : '0' + mm
  var dd = date.getDate()
  dd = dd > 9 ? dd : '0' + dd

  var hh = date.getHours()
  hh = hh > 9 ? hh : '0' + hh
  var mi = date.getMinutes()
  mi = mi > 9 ? mi : '0' + mi
  var ss = date.getSeconds()
  ss = ss > 9 ? ss : '0' + ss

  return yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mi + ':' + ss
})
// 价格过滤器
Vue.filter('currency', (val) => {
  // 把int转换为￥xx.yy
  return '￥' + val.toFixed(2)
})
// 桌台状态过滤器
Vue.filter('tableStatus', (val) => {
  switch (val) {
    case 1:
      return '空闲'
    case 2:
      return '预定'
    case 3:
      return '占用'
    default:
      return '其它'
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
