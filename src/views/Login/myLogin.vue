<template>
  <div>
    <!-- 头部标题 -->
    <van-nav-bar title="黑马头条-登录" />
    <!-- 表单登录部分 -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        required
        name="mobile"
        label="手机号"
        placeholder="请输入11位手机号"
        :rules="loginFormRule.mobile"
      />
      <van-field
        v-model="user.code"
        required
        type="password"
        name="code"
        label="密码"
        placeholder="请输入6位密码"
        :rules="loginFormRule.code"
      />
      <div style="margin: 16px">
        <van-button round block type="info" :disabled='isLoading' :loading='isLoading' loading-text="加载中..."  native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { loginAPI } from '@/api'
import { setToken } from '@/utils/token'
import { Notify } from 'vant'
export default {
  name: 'myLogin',
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: ''// 验证码（密码必须是246810）
      },
      loginFormRule: {
        mobile: [
          { required: true, message: '请填写手机号', pattern: /^1[3-9]\d{9}$/ }
        ],
        code: [
          { required: true, message: '请填写密码', pattern: /^\d{6}$/ }
        ]
      },
      isLoading: false // 登录状态
    }
  },
  methods: {
    async onSubmit () {
      // 点击后改变登录状态
      this.isLoading = true
      try {
        const res = await loginAPI(this.user)
        Notify({ type: 'success', message: '登录成功！！' })
        setToken(res.data.data.token)
        this.$router.replace({
          path: '/layout/home'
        })
        // console.log(res)
      } catch (error) {
        Notify({ type: 'danger', message: '账号或密码错误' })
      }
      // 发送完请求后，无论成功失败，还原登录状态
      this.isLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
// .van-nav-bar{
//     background-color: #007bff;
// }
// ::v-deep .van-nav-bar__title{
//     color: white;
// }
</style>
