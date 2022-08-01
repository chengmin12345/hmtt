// 封装全局指令
import Vue from 'vue'

// 封装的函数插件（自动聚焦）
export const directiveObj = {
  install (Vue) {
    Vue.directive('fofo', {
      inserted (el) {
        // 指令所在的van-search。组件根标签是div,input内部，都是元素标签对象
        // 元素DOM.nodeName  拿到标签名字（大写字符串）
        if (el.nodeName === 'TEXTAREA' || el.nodeName === 'INPUT') {
          el.focus()
        } else {
          // el 本身不是输入框，尝试往里获取一下
          const theInput = el.querySelector('input')
          const theTextArea = el.querySelector('textarea')
          if (theInput) theInput.focus()
          if (theTextArea) theTextArea.focus()
        }
      },
      updated (el) {
        // 指令所在的van-search。组件根标签是div,input内部，都是元素标签对象
        // 元素DOM.nodeName  拿到标签名字（大写字符串）
        if (el.nodeName === 'TEXTAREA' || el.nodeName === 'INPUT') {
          el.focus()
        } else {
          // el 本身不是输入框，尝试往里获取一下
          const theInput = el.querySelector('input')
          const theTextArea = el.querySelector('textarea')
          if (theInput) theInput.focus()
          if (theTextArea) theTextArea.focus()
        }
      }
    })
  }
}
// 执行目标对象里的Install方法并传入vue类（使用插件）
Vue.use(directiveObj)
