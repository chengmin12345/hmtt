<template>
  <div>
    <div class="home-container">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <van-tabbar v-model="active" route>
    <van-tabbar-item icon="home-o" to="/layout/home">首页</van-tabbar-item>
    <van-tabbar-item icon="friends-o" to="/layout/user">我的</van-tabbar-item>

</van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'myLayout',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less" scoped>
.home-container{
  padding-bottom: 50px;
}
.van-tabbar{
  border-top:1px solid #f8f8f8
}
</style>
