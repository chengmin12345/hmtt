<template>
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh" loosing-text>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
      offset="50"
    >
      <ArticleItem
        v-for="li in list"
        :key="li.art_id"
        :artObj="li"
        @disLikeEV="disLikeFn"
        @reportEV="reportFn"
        @click.native="itemClickFn(li.art_id)"
      ></ArticleItem>
    </van-list>
  </van-pull-refresh>
</template>

<script>
import ArticleItem from '../../../components/ArticleItem.vue'
import { getAllArticleAPI, dislikeArticleAPI, reportArticleAPI } from '@/api'
import Notify from '@/ui/Notify'
export default {
  name: 'ArticleList',
  props: {
    channelId: Number
  },
  components: {
    ArticleItem
  },
  data () {
    return {
      list: [], // 文章列表数据
      loading: false, // 底部加载状态
      finished: false, // 底部完成状态
      theTime: new Date().getTime(), // 用于分页
      isLoading: false // 顶部刷新状态
    }
  },
  created () {
    // 获取所有文章
    this.getNewArticleList()
  },
  methods: {
    // 获取所有文章
    // async getAllArticle () { // 页面一加载获取第一页数据
    //   const { data: res } = await getAllArticleAPI({
    //     channel_id: this.channelId,
    //     timestamp: this.theTime
    //   })
    //   console.log(res.data)
    //   this.list = res.data.results
    //   this.theTime = res.data.pre_timestamp
    // },
    // 顶部刷新或底部加载再次发送请求方法
    async getNewArticleList () {
      // 往下滑加载数据-->发送请求
      const { data: res } = await getAllArticleAPI({
        channel_id: this.channelId,
        timestamp: this.theTime
      })
      // console.log(res.data)
      // 请求到的数据和上一页的数据拼接一起给list
      this.list = [...this.list, ...res.data.results]
      this.theTime = res.data.pre_timestamp

      // 关闭加载状态，如果不关闭，底部一直是加载中的状态，下次触底不会再触发onload
      this.loading = false
      if (res.data.pre_timestamp === null) { // 本次返回的数据就是最后的，没有下一段数据了
        this.finished = true
      }
    },
    // 底部加载事件方法
    async onLoad () {
      if (this.list.length === 0) {
        this.loading = false // 第一次加载还是会判定是否触底（触发onload方法时loading自动改为true)
        return // 如果页面没有数据，也就没有高度，让本次onload逻辑代码不往下执行
      }
      // 再次发送请求
      this.getNewArticleList()
    },
    // 顶部刷新数据事件--->刷新时，清空之前加载的List，时间改为当前时间，刷新状态改为false
    onRefresh () {
      this.list = ''
      this.theTime = new Date().getTime()
      this.getNewArticleList()
      this.isLoading = false
    },
    // 返回-不感兴趣
    async disLikeFn (id) {
      try {
        await dislikeArticleAPI({ artId: id })
        Notify({ type: 'success', message: '反馈成功！！' })
      } catch (err) {
        console.log('失败了')
      }
    },
    // 举报文章
    async reportFn (id, value) {
      await reportArticleAPI({
        artId: id,
        type: value
      })
      Notify({ type: 'success', message: '举报成功！！' })
    },
    // 文章搜索结果点击调转到详情页事件
    itemClickFn (id) {
      this.$router.push(`/detail?art_id=${id}`)
    }
  }
}

</script>

<style lang="less" scoped></style>
