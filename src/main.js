import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible' // 引入适配
import '@/vant' // 引入vant组件
import '@/utils/directive' // 引入全局指令
import 'highlight.js/styles/default.css' // 代码高亮的样式

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
  // beforeCreate () {
  //   Vue.prototype.$bus = this // 安装全局事件总线
  // }
}).$mount('#app')
