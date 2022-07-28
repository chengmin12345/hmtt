<template>
  <div>
     <van-cell>
      <!-- 标题区域的插槽 -->
      <template #title>
        <div class="title-box">
          <!-- 标题 -->
          <span>{{ artObj.title }}</span>
          <!-- <img class="thumb" v-if="artObj.cover.type === 1" :src="artObj.cover.images[0]" alt=""> -->
          <van-image class="thumb" v-if="artObj.cover.type === 1" :src="artObj.cover.images[0]">
            <template v-slot:error>加载失败</template>
          </van-image>
        </div>
        <!-- 多图 -->
        <div class="thumb-box" v-if="artObj.cover.type > 1">
          <!-- <img class="thumb" v-for="(imgURL,index) in artObj.cover.images" :key="index" :src="imgURL" alt=""> -->
          <van-image class="thumb" v-for="(imgURL,index) in artObj.cover.images" :key="index" :src="imgURL">
            <template v-slot:error>加载走丢了</template>
          </van-image>
        </div>
      </template>
      <!-- label区域的插槽 -->
      <template #label>
        <div class="label-box">
          <div>
            <span>{{ artObj.aut_name }}</span>
            <span>{{ artObj.comm_count }}评论</span>
            <span>{{ formatTime(artObj.pubdate) }}</span>
          </div>
          <!-- 反馈按钮 -->
          <van-icon name="cross" @click="show=true" v-if="isShow"></van-icon>
        </div>
      </template>
     </van-cell>
     <!-- 反馈面板 -->
     <van-action-sheet v-model="show" :actions="actions" @select="onSelect" get-container="body" :cancel-text="bottomText" @cancel="cancelFn" @closed="closeFn"/>
  </div>
</template>

<script>
import { timeAgo } from '@/utils/date'
import { firstActions, secondActions } from '@/api/report'
export default {
  name: 'ArticleItem',
  props: {
    artObj: Object,
    isShow: {
      type: Boolean,
      default: true // 首页默认，获取文章搜索结果页面需要设置为false
    }
  },
  data () {
    return {
      show: false,
      actions: firstActions, // 反馈面板选项数组（套对象）
      bottomText: '取消'
    }
  },
  methods: {
    formatTime: timeAgo, // 函数体是timeAgo
    onSelect (actions) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      // this.show = false
      if (actions.name === '反馈垃圾内容') {
        this.actions = secondActions
        this.bottomText = '返回'
      } else if (actions.name === '不感兴趣') {
        this.$emit('disLikeEV', this.artObj.art_id)
        // 无论成功与失败反馈版隐藏
        this.show = false
      } else { // 到这里是到二级反馈面板
        this.$emit('reportEV', this.artObj.art_id, this.actions.value)
        // 无论成功与失败反馈版隐藏
        this.show = false
      }
    },
    // 反馈面板点击事件-一级二级显示隐藏
    cancelFn () {
      if (this.bottomText === '返回') {
        this.show = true // 组件默认弹出框点击“返回”后，隐藏，强制让他显示
        this.actions = firstActions
        this.bottomText = '取消'
      }
    },
    // 关闭反馈面板点击事件--重置
    closeFn () {
      this.actions = firstActions
      this.bottomText = '取消'
    }
  }

}
</script>

<style lang="less" scoped>
   /* 标题样式 */
   .title-box {
     display: flex;
     justify-content: space-between;
     align-items: flex-start;
   }

   /* label描述样式 */
   .label-box {
     display: flex;
     justify-content: space-between;
     align-items: center;
   }

   /* 文章信息span */
   .label-box span{
       margin: 0 3px;
       &:first-child{
           margin-left: 0;
       }
   }
   /* 图片的样式, 矩形黄金比例：0.618 */
   .thumb {
     width: 113px;
     height: 70px;
     background-color: #f8f8f8;
     object-fit: cover;
   }

   /* 三图, 图片容器 */
   .thumb-box {
     display: flex;
     justify-content: space-between;
   }
</style>
