<template>
  <div>
    <van-nav-bar title="频道管理">
        <template #right>
            <van-icon name="cross" size="0.37333334rem"
          color="white" @click="closeChannelFn"/>
        </template>
    </van-nav-bar>
     <!-- 我的频道 -->
       <div class="my-channel-box">
         <div class="channel-title">
           <span>我的频道
             <span class="small-title">
               点击{{isEdit?'删除':'进入'}}频道
             </span>
           </span>
           <span @click="editFn">{{isEdit?'完成':'编辑'}}</span>
         </div>
         <!-- 我的频道列表 -->
         <van-row type="flex">
           <van-col span="6" v-for="obj in userList" :key="obj.id" @click="myChannelsFn(obj)">
             <div class="channel-item van-hairline--surround">
               {{ obj.name }}
               <!-- 删除的徽标 -->
               <van-badge color="transparent" class="cross-badge" v-show="isEdit && obj.id !== 0">
                 <template #content>
                   <van-icon
                     name="cross"
                     class="badge-icon"
                     color="#cfcfcf"
                     size="0.32rem"
                     v-show="isEdit"
                   />
                 </template>
               </van-badge>
             </div>
           </van-col>
         </van-row>
       </div>
       <!-- 更多频道 -->
       <div class="more-channel-box">
         <div class="channel-title">
           <span>点击添加更多频道：</span>
         </div>
         <!-- 更多频道列表 -->
         <van-row type="flex">
           <van-col span="6" v-for="obj in unCheckList" :key="obj.id" @click="moreChennelFn(obj)">
             <div class="channel-item van-hairline--surround">{{ obj.name }}</div>
           </van-col>
         </van-row>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    userList: Array, // 用户已选
    unCheckList: Array // 用户未选
  },
  data () {
    return {
      isEdit: false
    }
  },
  methods: {
    // 编辑点击事件
    editFn () {
      this.isEdit = !this.isEdit
    },
    // 更多频道点击事件
    moreChennelFn (channelObj) {
      if (this.isEdit) {
        this.$emit('addChannelEV', channelObj)
      }
    },
    // 我的频道点击事件
    myChannelsFn (channelObj) {
      // 编辑状态->删除频道
      if (this.isEdit) {
        if (channelObj.id !== 0) {
          // 推荐频道不能删除，但是不能和上边一起写，一起写的话就变成进入频道了
          this.$emit('removeChannelEV', channelObj)
        }
      } else {
        // 切换频道
        this.$emit('closeEV') // 关闭弹出层
        this.$emit('input', channelObj.id) // 切换
        // 触发v-model绑定的input事件
        // 把值传出去绑定给v-model对应vue变量
      }
    },
    // 点击x关闭频道编辑弹出层
    closeChannelFn () {
      this.$emit('closeEV')
      this.isEdit = false
    }
  }

}
</script>

<style lang="less" scoped>
::v-deep .van-icon{
    color: #fff;
}
.my-channel-box,
   .more-channel-box {
     .channel-title {
       display: flex;
       justify-content: space-between;
       font-size: 14px;
       line-height: 28px;
       padding: 0 6px;
     }
   }

   .channel-item {
     font-size: 12px;
     text-align: center;
     line-height: 36px;
     background-color: #fafafa;
     margin: 5px;
   }

   /*删除的微标 */
   .cross-badge {
     position: absolute;
     right: -3px;
     top: 0;
     border: none;
   }

   /*提示文字 */
   .small-title {
     font-size: 10px;
     color: gray;
   }
</style>
