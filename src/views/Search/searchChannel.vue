<template>
    <div>
       <!-- 搜索页面头部 -->
       <div class="search-header">
         <!-- 后退按钮 -->
         <van-icon name="arrow-left" color="white" size="0.48rem" class="goback" @click="$router.back()"/>
         <!-- 搜索组件 -->
         <van-search
         v-model.trim="keyword"
         v-fofo
         placeholder="请输入搜索关键词"
         background="#007BFF"
         shape="round"
         @input="inputFn"
         @search="searchFn" />
       </div>
       <!-- 搜索建议列表 -->
       <div class="sugg-list" v-if="keyword.length !== 0">
        <div class="sugg-item" v-for="(str, index) in suggestList" :key="index" v-html="lightFn(str,keyword)"
        @click="suggestClickFn(str)">
        </div>
       </div>
       <!-- 搜索历史列表 -->
       <div class="search-history" v-else>
          <!-- 标题 -->
          <van-cell title="搜索历史">
            <!-- 删除图标 -->
              <template #right-icon>
                <van-icon name="delete" class="delete-icon" @click="clearHistoryFn"/>
              </template>
          </van-cell>
          <!-- 历史列表 -->
          <div class="history-list">
              <span class="history-item" v-for="(str,index) in history" :key="index" @click="historyClickFn(str)">{{ str }}</span>
          </div>
       </div>
     </div>
</template>

<script>
import { searchSuggestionAPI } from '@/api'
import { setStorage, getStorage } from '@/utils/storage'
export default {
  name: 'searchChannel',
  data () {
    return {
      keyword: '', // 搜索关键字
      timer: null, // 防抖定时器
      suggestList: [], // 联想列表数据
      history: JSON.parse(getStorage('his')) || [] // 搜索历史
    }
  },
  methods: {
    // 搜索框input事件
    inputFn () {
    // 防抖：输入框短时间输入多次，只有最后一次发挥发送网络请求
      clearTimeout(this.timer)
      if (this.keyword.length === 0) {
        this.suggestList = []
      } else {
        this.timer = setTimeout(
          async () => {
            if (this.keyword.length === 0) return
            const { data: res } = await searchSuggestionAPI({
              keyword: this.keyword
            })
            console.log(res)
            this.suggestList = res.data.options
          }, 300)
      }
    },
    // 专门处理搜索关键字高亮的方法
    lightFn (originStr, target) {
      /*
      originStr:原来字符串
      target：关键字
      字符串.replace() -> 替换第一个符合条件的
      字符串.replaceAll() -> 替换所有符合条件的
      返回值：替换后的完整字符串
      */
      //  如果想要使用变量作为正则的匹配条件，不能使用语法糖简化
      const reg = new RegExp(target, 'ig') // i忽略大小写，g全局匹配
      // 替换后的值不能用target
      // 例如: 输入框里 java, 匹配回来的联想菜单Java, JAVA, jAVA, 都被你replace换成输入框target值java
      return originStr.replace(reg, (match) => {
        // match就是匹配中时, 原字符串里的那个字符, 用人家原来的, 只不过我们给个颜色即可
        return `<span style="color: red;">${match}</span>`
      })
    },
    // 封装一个函数-搜索框回车跳转、点击历史记录跳转、点击联想菜单跳转
    moveFn (theKw) {
      // 坑: 路由跳转, 在watch之前执行, 所以我们要让路由跳转, 来一个定时器包裹, 让跳转最后执行
      setTimeout(() => {
        this.$router.push({
          path: `/search_result/${theKw}`
        })
      }, 0)
    },
    // 搜索按下回车键跳转页面事件
    searchFn () {
      if (this.keyword.length > 0) {
        // 搜索关键字-保存到数组里
        this.history.push(this.keyword)
        this.moveFn(this.keyword)
      }
    },
    // 点击联想菜单跳转页面
    suggestClickFn (str) {
      // 搜索关键字-保存到数组里
      this.history.push(str)
      this.moveFn(str)
    },
    // 点击搜索历史跳转页面
    historyClickFn (str) {
      this.moveFn(str)
    },
    // 清空历史
    clearHistoryFn () {
      this.history = []
    }
  },
  watch: {
    history: { // 历史记录数组的改变
      deep: true,
      handler () {
        // ES6新增了2种引用类型(以前 Array, Object), (新增: Set Map)
        // Set: 无序不重复的value集合体 (无下角标)
        // 特点: 你传入的数组类型, 如果有重复元素, 会自动清理掉重复元素, 返回无重复的Set对象
        // 注意: 如果值是对象比较的是对象内存地址
        const theSet = new Set(this.history)
        // 立即覆盖式的保存到本地
        setStorage('his', JSON.stringify([...theSet]))
      }
    }
  }

}
</script>

<style scoped lang="less">
.search-header {
  height: 46px;
  display: flex;
  align-items: center;
  background-color: #007bff;
  overflow: hidden;
  /*后退按钮*/
  .goback {
    padding-left: 14px;
  }
  /*搜索组件*/
  .van-search {
    flex: 1;
  }
}
/*搜索建议列表*/
.sugg-list{
  .sugg-item{
    padding:  0 15px;
    border-bottom: 10x solid #f8f8f8;
    font-size: 14px;
    // 实现省略号
    white-space:nowarp;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
/**搜索历史 */
   .search-icon {
     font-size: 16px;
     line-height: inherit;
   }

   .history-list {
     padding: 0 10px;
     .history-item {
       display: inline-block;
       font-size: 12px;
       padding: 8px 14px;
       background-color: #efefef;
       margin: 10px 8px 0px 8px;
       border-radius: 10px;
     }
   }
</style>
