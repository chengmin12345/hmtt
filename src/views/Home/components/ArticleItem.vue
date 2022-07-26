<template>
  <div>
     <van-cell>
      <!-- 标题区域的插槽 -->
      <template #title>
        <div class="title-box">
          <!-- 标题 -->
          <span>{{ artObj.title }}</span>
          <img class="thumb" v-if="artObj.cover.type === 1" :src="artObj.cover.images[0]" alt="">
        </div>
        <!-- 多图 -->
        <div class="thumb-box" v-if="artObj.cover.type > 1">
          <img class="thumb" v-for="(imgURL,index) in artObj.cover.images" :key="index" :src="imgURL" alt="">
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
          <van-icon name="cross"></van-icon>
        </div>
      </template>
     </van-cell>
  </div>
</template>

<script>
import { timeAgo } from '@/utils/date'
export default {
  name: 'ArticleItem',
  props: {
    artObj: Object
  },
  methods: {
    formatTime: timeAgo // 函数体是timeAgo
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
