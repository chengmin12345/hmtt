<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar fixed>
      <template v-slot:left>
        <img src="@/assets/logo.png" class="logo" alt="" />
      </template>
      <template v-slot:right>
        <!-- postcss只能翻译style里的css样式代码，标签内的样式无法将px转换成rem,需要动手自己算18/37.5  -->
        <van-icon name="search" size="0.48rem" color="#fff" @click="$router.push('/search')"/>
      </template>
    </van-nav-bar>
    <!-- tab导航条 -->
    <div class="nav-bar-list">
      <van-tabs v-model="channelId" sticky offset-top="1.226667rem" animated>
        <van-tab
          v-for="list in userChannelList"
          :key="list.id"
          :title="list.name"
          :name="list.id"
        >
          <ArticleList :channelId="channelId"></ArticleList>
        </van-tab>
      </van-tabs>
      <!-- +图标 -->
      <van-icon name="plus" size="0.37333334rem" class="moreChannels" @click="plusClickFn"/>
      <!-- 编辑管理弹出层 -->
      <van-popup v-model="channel_show" get-container="body" class="channel_pannel">
         <channelEdit
          :userList="userChannelList"
          :unCheckList="unCheckChannelList"
          @addChannelEV="addChannelFn"
          @removeChannelEV="removeChannelFn"
          @closeEV="closeFn"
          v-model="channelId">
          </channelEdit>
      </van-popup>
    </div>
  </div>
</template>

<script>
import ArticleList from './components/ArticleList.vue'
import channelEdit from './channelEdit.vue'
import { getUserChannelAPI, getAllChannelAPI, updateChannelAPI, removeChannelAPI } from '@/api'
export default {
  name: 'myHome',
  components: { ArticleList, channelEdit },
  data () {
    return {
      channelId: 0, // 激活时的频道id
      userChannelList: [], // 用户频道列表数据
      allChannelList: [], // 所有频道列表数据
      channel_show: false // 频道管理弹出面板

    }
  },
  computed: {
    unCheckChannelList () {
      // 把所有频道数组挨个遍历，然后去用户频道数组中查询，如果找不到，则filter方法收集到一个新数组里
      // const newArr = this.allChannelList.filter(bigObj => {
      //   const index = this.userChannelList.findIndex(smallObj => {
      //     return smallObj.id === bigObj.id
      //   })
      //   // 如果找到了
      //   if (index > -1) {
      //     return false
      //   } else {
      //     return true
      //   }
      // })
      // return newArr
      return this.allChannelList.filter(bigObj => (this.userChannelList.findIndex(smallObj => smallObj.id === bigObj.id) === -1))
    }
  },
  created () {
    // 获取用户频道
    this.getUserChannel()
    // 获取所有频道
    this.getAllChannel()
  },
  methods: {
    // 获取用户频道
    async getUserChannel () {
      const { data: res } = await getUserChannelAPI()
      // console.log(res)
      this.userChannelList = res.data.channels
    },
    // 获取所有频道
    async getAllChannel () {
      const { data: res } = await getAllChannelAPI()
      // console.log(res)
      this.allChannelList = res.data.channels
    },
    // +号点击事件
    plusClickFn () {
      this.channel_show = true
    },
    // 添加频道
    async addChannelFn (channelObj) {
      this.userChannelList.push(channelObj)
      // 问题: 为何只需要push, 不需要从下面数组里移除
      // 还要把最新的数组, 发送给后台
      // 数组里对象字段 -> 转换
      // 推荐频道不能传递-删除出不是推荐频道剩下的频道对象
      // const newArr = this.userChannelList.filter(obj => obj.id !== 0)
      // newArr.forEach((obj, index) => {
      //   // delete 对象.属性 可以删除键值对
      //   delete obj.name
      // obj的序号属性seq
      //   obj.seq = index
      // })
      // const res = await updateChannelsAPI({
      //   channels: newArr
      // })
      // console.log(res)
      // 上面的代码出问题, 新增时, 名字被删除了
      // 原因: 所有数组里的对象, 都是同一个内存地址, 影响到ChannelEdit.vue中对象
      // 解决方法
      const newArr = this.userChannelList.filter((obj) => obj.id !== 0)
      const theNewArr = newArr.map((obj, index) => {
        const newObj = { ...obj } // 浅拷贝
        delete newObj.name
        newObj.seq = index
        return newObj // 让map方法把新对象收集起来形成一个新数组
      })
      const { data: res } = await updateChannelAPI({
        channels: theNewArr
      }
      )
      console.log(res)
    },
    // 删除频道篇
    async removeChannelFn (channelObj) {
      const index = this.userChannelList.findIndex(obj => obj.id === channelObj.id)
      this.userChannelList.splice(index, 1)

      // 第一种方式: 把现在用户数组的数据, 再覆盖式的发给后台
      // 需要把上面的更新数组过程, 封装一个函数, add和remove里调用(笔记里)
      // 第二种方式: 只调用删除的接口
      const { data: res } = await removeChannelAPI({
        channelId: channelObj.id
      })
      console.log(res)
      // 知道: 删除接口返回状态码204(Not Content) 无返回内容
    },
    // 关闭弹出层
    closeFn () {
      this.channel_show = false
    },
    //  滚动条滚动事件
    scrollFn () {
      this.$route.meta.scrollT = document.documentElement.scrollTop
    }
  },
  activated () {
    // 实时检测滚动条的位置
    window.addEventListener('scroll', this.scrollFn)
    //  立刻设置，滚动条的位置
    document.documentElement.scrollTop = this.$route.meta.scrollT
  },
  deactivated () {
    window.removeEventListener('scroll', this.scrollFn)
  }
}
</script>

<style lang="less" scoped>
.logo {
  width: 100px;
  height: 30px;
}
.nav-bar-list {
  padding-top: 44px;
}
// 设置 tabs 容器的样式
::v-deep .van-tabs__wrap {
  padding-right: 30px;
  background-color: #fff;
}

// 设置小图标的样式
.moreChannels {
  position: fixed;
  top: 62px;
  right: 8px;
  z-index: 999;
}
.channel_pannel{
  width: 100%;
  height: 100%;
}
</style>
