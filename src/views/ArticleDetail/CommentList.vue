<template>
  <div>
    <!-- 评论列表 -->
    <div class="cmt-list" :class="{'art-cmt-container-1':showCommentBox,'art-cmt-container-2':!showCommentBox}">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多评论了，请发表评论"
        @load="onLoad"
        :immediate-check="false"
      >
        <!-- 评论的 Item 项 -->
        <div class="cmt-item" v-for="obj in commentList" :key="obj.com_id">
          <!-- 头部区域 -->
          <div class="cmt-header">
            <!-- 头部左侧 -->
            <div class="cmt-header-left">
              <img :src="obj.aut_photo" alt="" class="avatar" />
              <span class="uname">{{ obj.aut_name }}</span>
            </div>
            <!-- 头部右侧 -->
            <div class="cmt-header-right">
              <van-icon
                name="like"
                size="16"
                color="red"
                v-if="obj.is_liking === true"
                @click="likingsClickFn(true, obj)"
              />
              <van-icon
                name="like-o"
                size="16"
                color="gray"
                v-else
                @click="likingsClickFn(false, obj)"
              />
            </div>
          </div>
          <!-- 主体区域 -->
          <div class="cmt-body">
            {{ obj.content }}
          </div>
          <!-- 尾部区域 -->
          <div class="cmt-footer">{{ formatDate(obj.pubdate) }}</div>
        </div>
      </van-list>
    </div>
    <!-- 添加评论的容器 -->
    <div>
      <!-- 底部添加评论区域 - 1 -->
      <div class="add-cmt-box van-hairline--top" v-if="showCommentBox">
          <van-icon name="arrow-left" size="0.48rem" @click="$router.back()" />
          <div class="ipt-cmt-div" @click="toggleShowFn">发表评论</div>
          <div class="icon-box">
              <van-badge :content="totalCount === 0?'':totalCount" max="99">
                  <van-icon name="comment-o" size="0.53333334rem" @click="commentClickFn"/>
              </van-badge>
              <van-icon name="star-o" size="0.53333334rem" v-if="collectionList.is_collected"  @click="collectFn(true)"/>
              <van-icon name="star" size="0.53333334rem" v-else  color="red"   @click="collectFn(false)"/>
              <van-icon name="share-o" size="0.53333334rem" @click="shareFn"/>
          </div>
      </div>
      <!-- 底部添加评论区域 - 2 -->
      <div class="cmt-box van-hairline--top" v-else >
          <textarea placeholder="友善评论、理性发言、阳光心灵" v-fofo @blur="blurFn" v-model.trim="comText"></textarea>
          <van-button type="default" :disabled="comText.length === 0" @click="sendFn">发布</van-button>
      </div>
      <!-- 分享面板 -->
      <van-share-sheet
        v-model="showShare"
        title="立即分享给好友"
        :options="options"
      />
    </div>
  </div>
</template>

<script>
import { getCommentListAPI, likeCommentAPI, dislikeCommentAPI, sendArtCommentAPI, collectArtAPI, unCollectArtAPI } from '@/api'
import { timeAgo } from '@/utils/date'
export default {
  name: 'commentList',
  data () {
    return {
      offset: null, // 偏移量评论
      commentList: [], // 评论列表数据
      totalCount: 0, // 评论总数
      showCommentBox: true, // 显示评论的容器
      comText: '', // 发布评论的文字
      loading: false, // 加载状态
      finished: false, // 加载完成状态
      lastId: null, // 分页
      page: 1, // 默认收藏列表第一页
      collectionList: this.detailObj, // 收藏列表数据
      // detailObj: detailObj,
      showShare: false, // 分享面板
      options: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '朋友圈', icon: 'wechat-moments' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' }
        ],
        [
          { name: '复制链接', icon: 'link' },
          { name: '分享海报', icon: 'poster' },
          { name: '二维码', icon: 'qrcode' },
          { name: '小程序码', icon: 'weapp-qrcode' }
        ]
      ] // 分享的分类
    }
  },
  created () {
    // 获取文章评论
    this.getArticleComment()
    // // 获取文章收藏列表
    // this.getArtCollectionList()
  },
  mounted () {
    // // 绑定事件（接收数据 这里的回调函数留在当前组件中，放在methods中）
    // this.$bus.$on('collect', (data) => {
    //   this.detailObj = data
    // })
  },
  props: {
    detailObj: Object
  },
  methods: {
    // 获取文章评论
    async getArticleComment () {
      const { data: res } = await getCommentListAPI({
        id: this.$route.query.art_id, // 文章id
        offset: this.lastId
      })
      this.commentList = res.data.results
      this.totalCount = res.data.total_count // 评论总数量
      this.lastId = res.data.last_id // 分页

      // 网页打开没有评论，res结果为空数组，直接让list组件显示没有更多数据底部文字
      if (res.data.results.length === 0) {
        this.finished = true
      }
    },
    // 时间转换
    formatDate: timeAgo,
    // 评论点赞/取消点赞
    async likingsClickFn (boolean, commentObj) {
      if (boolean === true) {
        // 点击已点赞--->目标取消点赞
        commentObj.is_liking = false
        await dislikeCommentAPI({
          comId: commentObj.com_id
        })
      } else {
        // 点击点赞 ----> 目标点赞
        commentObj.is_liking = true
        await likeCommentAPI({
          comId: commentObj.com_id
        })
      }
    },
    // 点击发表评论框显示具体发表的评论框
    toggleShowFn () {
      this.showCommentBox = false
    },
    // 点击评论图标，直接滑到评论区
    commentClickFn () {
      // 设置window.scrollTop(0,文章内容高度)
      // JS代码是在html+css运行后。真实DOM已经在网页上了，从document往下获取标签是🆗的
      // article-container是真实DOM里的标签，可以打开控制台找
      // 下面这个没有动画
      // const articleHeight = document.querySelector('.article-container').scrollHeight
      // window.scrollTo(0, articleHeight)

      // 及既滚动又带动画
      // 原生标签.scrollIntoView(), 让原生标签滚动到屏幕最上边
      // 为何选择link-box,不选择第一条评论，因为头部导航会挡住
      document.querySelector('.like-box').scrollIntoView({
        behavior: 'smooth' // 设置出现的滑动效果->平滑的动画
      }) // 我的电脑不支持这个效果
    },
    // 失去焦点延迟执行，在点击发布按钮后再执行
    blurFn () {
      // 问题:点击发布按钮后，发现点击事件不执行-排除代码问题
      // 原因：评论容器在页面点击发布的一瞬间失焦了，被v-if和v-else移除了整个标签，导致点击事件没来得及执行
      // 解决：失去焦点时，变量值延后执行，包一个定时器，在点击发布按钮后执行
      setTimeout(() => {
        this.showCommentBox = true
      }, 0)
    },
    // 点击发布按钮
    async sendFn () {
      const { data: res } = await sendArtCommentAPI({
        id: this.$route.query.art_id,
        content: this.comText
      })
      this.commentList.unshift(res.data.new_obj)
      // 发布完，数量要+1
      this.totalCount++
      //  发布完，评论输入框要清空
      this.comText = ''
      // 让第一条评论滚到到屏幕最上边，调用commentClickFn
      this.commentClickFn()
    },
    // 滑动加载更多评论事件
    async onLoad () {
      if (this.commentList.length > 0) {
        // 请求下一页(重新获取文章评论)
        const { data: res } = await getCommentListAPI({
          id: this.$route.query.art_id, // 文章id
          offset: this.lastId
        })
        this.commentList = [...this.commentList, ...res.data.results]
        this.totalCount = res.data.total_count // 评论总数量
        this.lastId = res.data.last_id // 分页
        if (res.data.last_id === null) {
          this.finished = true
        }
        this.loading = false
      } else {
        this.loading = false
      }
    },
    // 收藏/取消收藏文章
    async collectFn (boolean) {
      if (boolean === true) {
        // 收藏了-->目标取消收藏
        this.collectionList.is_collected = false
        await unCollectArtAPI({
          artId: this.$route.query.art_id
        })
      } else {
        // 没收藏-->目标要收藏
        this.collectionList.is_collected = true
        await collectArtAPI({
          artId: this.$route.query.art_id
        })
      }
    },
    // // 获取文章收藏列表
    // async getArtCollectionList () {
    //   const { data: res } = await collectArtListAPI({
    //     page: this.page
    //   })
    //   this.collectionList = res.data.results
    //   // console.log(this.collectionList, '111')
    // },
    //  点击分享按钮
    shareFn () {
      this.showShare = true
    }
  }
}
</script>

<style scoped lang="less">
.cmt-list {
  padding: 10px;
  .cmt-item {
    padding: 15px 0;
    + .cmt-item {
      border-top: 1px solid #f8f8f8;
    }
    .cmt-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .cmt-header-left {
        display: flex;
        align-items: center;
        .avatar {
          width: 40px;
          height: 40px;
          background-color: #f8f8f8;
          border-radius: 50%;
          margin-right: 15px;
        }
        .uname {
          font-size: 12px;
        }
      }
    }
    .cmt-body {
      font-size: 14px;
      line-height: 28px;
      text-indent: 2em;
      margin-top: 6px;
      word-break: break-all;
    }
    .cmt-footer {
      font-size: 12px;
      color: gray;
      margin-top: 10px;
    }
  }
}
/*美化 - 文章详情 - 底部的评论页面 */
   // 外层容器
   .art-cmt-container-1 {
     padding-bottom: 46px;
   }
   .art-cmt-container-2 {
     padding-bottom: 80px;
   }

   // 发布评论的盒子 - 1
   .add-cmt-box {
     position: fixed;
     bottom: 0;
     left: 0;
     width: 100%;
     box-sizing: border-box;
     background-color: white;
     display: flex;
     justify-content: space-between;
     align-items: center;
     height: 46px;
     line-height: 46px;
     padding-left: 10px;
     .ipt-cmt-div {
       flex: 1;
       border: 1px solid #efefef;
       border-radius: 15px;
       height: 30px;
       font-size: 12px;
       line-height: 30px;
       padding-left: 15px;
       margin-left: 10px;
       background-color: #f8f8f8;
     }
     .icon-box {
       width: 40%;
       display: flex;
       justify-content: space-evenly;
       line-height: 0;
     }
   }

   .child {
     width: 20px;
     height: 20px;
     background: #f2f3f5;
   }

   // 发布评论的盒子 - 2
   .cmt-box {
     position: fixed;
     bottom: 0;
     left: 0;
     width: 100%;
     height: 80px;
     display: flex;
     justify-content: space-between;
     align-items: center;
     font-size: 12px;
     padding-left: 10px;
     box-sizing: border-box;
     background-color: white;
     textarea {
       flex: 1;
       height: 66%;
       border: 1px solid #efefef;
       background-color: #f8f8f8;
       resize: none;
       border-radius: 6px;
       padding: 5px;
     }
     .van-button {
       height: 100%;
       border: none;
     }
   }
</style>
