import Vue from 'vue'

// 封装的函数插件（自动聚焦）
export const directiveObj = {
  install (Vue) {
    Vue.directive('fofo', {
      inserted (el) {
        // 指令所在的van-search。组件根标签是div,input内部，都是元素标签对象
        const theInput = el.querySelector('input')
        theInput.focus()
      }
    })
  }
}
// 执行目标对象里的Install方法并传入vue类（使用插件）
Vue.use(directiveObj)
