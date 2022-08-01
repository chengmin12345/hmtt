<template>
  <div>
    <!-- 搜索结果页-头部导航 -->
    <div class="search-result-container">
      <!-- 点击实现后退效果 -->
      <van-nav-bar
        title="搜索结果"
        left-arrow
        @click-left="$router.back()"
        fixed
      />
    </div>
    <!-- 搜索文章结果列表 -->
    <div>
        <!-- 文章结果列表组件 -->
        <ArticleItem
        v-for="obj in articleList"
        :key=" obj.art_id"
        :artObj="obj"
        :isShow="false"
        @click.native="itemClickFn(obj.art_id)"
        ></ArticleItem>
         <!-- 加载更多 -->
        <van-list
        v-model="loading"
        loading-text
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check="false"
        @load="onLoad"
        >
        </van-list>
    </div>
  </div>
</template>

<script>
import { searchResultAPI } from '@/api'
import ArticleItem from '../../components/ArticleItem.vue'
export default {
  name: 'SearchResult',
  data () {
    return {
      page: 1, // 页码
      articleList: [], // 搜索文章结果列表
      loading: false, // 文章加载状态
      finished: false // 文章加载完成状态
    }
  },
  created () {
    // 获取文章搜索结果列表
    this.getsearchResultAPI()
  },
  methods: {
    // 获取文章搜索结果列表
    async getsearchResultAPI () {
      const { data: res } = await searchResultAPI({
        page: this.page,
        q: this.$route.params.keyword
      })
      // console.log(res)
      if (res.data.results.length === 0) {
        this.finished = true
      }
      this.articleList = [...this.articleList, ...res.data.results]
    },
    // 文章加载事件
    onLoad () {
      // 页面有数据才进行加载，没数据不加载
      if (this.articleList.length > 0) {
        this.page++
        this.getsearchResultAPI()
        this.loading = false
      }
    },
    // 文章搜索结果点击调转到详情页事件
    itemClickFn (id) {
      this.$router.push(`/detail?art_id=${id}`)
    }
  },
  components: {
    ArticleItem
  }
}
</script>

<style lang="less" scoped>
.search-result-container {
    padding-top: 46px;
}

</style>
