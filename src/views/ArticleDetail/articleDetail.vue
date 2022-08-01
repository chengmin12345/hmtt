<template>
  <div>
    <!-- Header 区域 -->
    <van-nav-bar
      fixed
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 文章加载中。。。。。。 -->
    <van-loading size="24px" color="#0094ff" v-if="Object.keys(detailObj).length === 0">加载中...</van-loading>
    <!-- 文章信息区域 -->
    <div class="article-container">
      <!-- 文章标题 -->
      <h1 class="art-title">{{ detailObj.title}}</h1>

      <!-- 用户信息 -->
      <van-cell center :title="detailObj.aut_name" :label="formatDate(detailObj.pubdate)">
        <template #icon>
          <img :src="detailObj.aut_photo" alt="" class="avatar" />
        </template>
        <template #default>
          <div>
            <van-button v-if="detailObj.is_followed" type="info" size="mini" @click="followedFn(true)">已关注</van-button>
            <van-button v-else icon="plus" type="info" size="mini" plain @click="followedFn(false)"
              >关注</van-button
            >
          </div>
        </template>
      </van-cell>

      <!-- 分割线 -->
      <van-divider></van-divider>

      <!-- 文章内容 -->
      <div class="art-content" v-html="detailObj.content"></div>

      <!-- 分割线 -->
      <van-divider>End</van-divider>

      <!-- 点赞 -->
      <div class="like-box">
        <van-button v-if="detailObj.attitude === 1" icon="good-job" type="danger" size="small"
        @click="loveFn(true)"
          >已点赞</van-button
        >
        <van-button v-else icon="good-job-o" type="danger" plain size="small"
        @click="loveFn(false)"
          >点赞</van-button
        >
      </div>
    </div>
    <!-- 文章评论部分 -->
    <div>
      <CommentList :detailObj="detailObj"></CommentList>
    </div>
  </div>
</template>

<script>
import CommentList from './CommentList.vue'
import { articleDetailAPI, followedAPI, unfollowedAPI, likingsAPI, dislikeAPI } from '@/api'
import { timeAgo } from '@/utils/date'
export default {
  name: 'articleDetail',
  data () {
    return {
      detailObj: {} // 文章详情列表
    }
  },
  created () {
    // 获取文章详情
    this.getArticleDetail()
  },
  methods: {
    // 获取文章详情
    async getArticleDetail () {
      const { data: res } = await articleDetailAPI({
        artId: this.$route.query.art_id
      })
      console.log(res)
      this.detailObj = res.data
      // // 触发事件（向CommentListl提供数据）
      // this.$bus.$emit('collect', this.detailObj)
    },
    // 时间转换
    formatDate: timeAgo,
    // 关注/取关作者
    async followedFn (boolean) {
      if (boolean === true) {
        // 点击--> 已关注---->目的要取关
        this.detailObj.is_followed = false
        const { data: res } = await unfollowedAPI({
          userId: this.detailObj.aut_id
        })
        console.log(res)
      } else {
        // 点击--->关注--->目的要关注
        this.detailObj.is_followed = true
        const { data: res } = await followedAPI({
          userId: this.detailObj.aut_id
        })
        console.log(res)
      }
    },
    // 点赞/取消点赞文章事件
    async loveFn (boolean) {
      if (boolean === true) {
        // 点击-->已点赞-->目标取消点赞
        this.detailObj.attitude = 0
        const { data: res } = await dislikeAPI({
          artId: this.detailObj.art_id
        })
        console.log(res)
      } else {
        // 点击-->点赞-->目标点赞
        this.detailObj.attitude = 1
        const { data: res } = await likingsAPI({
          artId: this.detailObj.art_id
        })
        console.log(res)
      }
    }

  },
  components: { CommentList }
}
</script>

<style scoped lang="less">
.article-container {
  padding: 10px;
  margin-top: 46px;
}
.art-title {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
}

.art-content {
  font-size: 12px;
  line-height: 24px;
  width: 100%;
  overflow-x: scroll;
  word-break: break-all;
  /deep/ img {
    width: 100%;
  }
  /deep/ pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
}

.van-cell {
  padding: 5px 0;
  &::after {
    display: none;
  }
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f8f8f8;
  margin-right: 5px;
  border: none;
}

.like-box {
  display: flex;
  justify-content: center;
}
.van-loading{
  text-align: center;
  padding-top:46px;
}
</style>
