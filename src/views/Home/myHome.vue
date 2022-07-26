<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar fixed>
      <template v-slot:left>
        <img src="@/assets/logo.png" class="logo" alt="">
      </template>
      <template v-slot:right>
        <!-- postcss只能翻译style里的css样式代码，标签内的样式无法将px转换成rem,需要动手自己算18/37.5  -->
        <van-icon name="search" size="0.48rem" color="#fff" />
      </template>
    </van-nav-bar>
    <!-- tab导航条 -->
    <div class="nav-bar-list">
      <van-tabs v-model="channelId" sticky offset-top="1.226667rem" animated @change="channelChangeFn">
        <van-tab
          v-for="list in userChannelList"
          :key="list.id"
          :title="list.name"
          :name="list.id">
        <ArticleList :list="articleList"></ArticleList>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import ArticleList from './components/ArticleList.vue'
import { getUserChannelAPI, getAllArticleAPI } from '@/api'
export default {
  name: 'myHome',
  components: { ArticleList },
  data () {
    return {
      channelId: 0, // 激活时的频道id
      userChannelList: [], // 用户频道列表数据
      articleList: [] // 文章列表数据
    }
  },
  created () {
    // 获取用户频道
    this.getUserChannel()
    // 获取所有文章
    this.getAllArticle()
  },
  methods: {
    // 获取用户频道
    async getUserChannel () {
      const { data: res } = await getUserChannelAPI()
      console.log(res)
      this.userChannelList = res.data.channels
    },
    // 获取所有文章
    async getAllArticle () {
      const { data: res } = await getAllArticleAPI({
        channel_id: this.channelId,
        timestamp: (new Date()).getTime()
      })
      console.log(res.data)
      this.articleList = res.data.results
    },
    // 点击tabs导航条--->重新获取数据
    channelChangeFn () {
      this.getAllArticle()
    }
  }
}
</script>

<style lang="less" scoped>
.logo{
  width: 100px;
  height: 30px;
}
.nav-bar-list{
  padding-top: 50px;
}
</style>
