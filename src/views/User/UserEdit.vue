  <template>
     <div class="user-edit-container">
       <!-- Header 区域 -->
       <van-nav-bar title="编辑资料" left-arrow @click-left="$router.back()" fixed />

       <!-- 用户资料 -->
       <van-cell-group class="action-card">
         <van-cell title="头像" is-link center>
           <template #default>
             <van-image round class="avatar" :src="$store.state.userPhoto" @click="ImgClickFn"/>
             <!-- file 选择框 -->
             <input
                type="file"
                ref="iptFile"
                v-show="false"
                accept="image/*"
                @change="onFileChange"
             >
           </template>
         </van-cell>
         <van-cell title="名称" is-link :value="userInfoObj.name" @click="nameClickFn"/>
         <van-cell title="生日" is-link :value="userInfoObj.birthday" @click="birthdayClickFn"/>
       </van-cell-group>
       <!-- 姓名修改的弹出框 -->
       <van-dialog v-model="changeNameShow" title="修改昵称" show-cancel-button :before-close="beforeCloseFn">
          <!-- 输入框 -->
        <input type="text" v-model="userName" v-fofo>
       </van-dialog>
       <!-- 日期选择器弹出层 -->
       <van-popup
            v-model="showDate"
             round
            position="bottom"
            :style="{ height: '50%' }"
            >
           <van-datetime-picker
            v-model="currentDate"
            type="date"
            title="选择年月日"
            :min-date="minDate"
            :max-date="maxDate"
            @cancel="dateCancelFn"
            @confirm="confimDateFn"
            />
       </van-popup>
     </div>
   </template>

<script>
import { getUserIntroductionAPI, updataUserImgAPI, updateUserInfoAPI } from '@/api'
import Notify from '@/ui/Notify'
import { formatDate } from '@/utils/date'
import { mapMutations } from 'vuex'
export default {
  name: 'UserEdit',
  data () {
    return {
      userInfoObj: {}, // 个人简介
      changeNameShow: false, // 修改姓名的弹出框
      userName: '', // 姓名输入框的数据
      minDate: new Date(1900, 0, 1), // 最小可选择的日期
      maxDate: new Date(), // 默认当前的日期
      currentDate: new Date(), // 当前选择的日期
      showDate: false // 日期选择器显示状态
    }
  },
  created () {
    // 获取个人简介
    this.getUserIntroduction()
  },
  methods: {
    ...mapMutations(['SET_USERPHOTO', 'SET_USERNAME']),
    // 获取个人简介
    async getUserIntroduction () {
      const { data: res } = await getUserIntroductionAPI()
      console.log(res)
      this.userInfoObj = res.data
    },
    // 文件选择改变事件
    async onFileChange (e) {
      if (e.target.files.length === 0) return // 用户点开了选择文件框，但没有选择文件点击了取消
      console.log(e.target.files[0]) // 用户选中的文件对象时一个伪数组
      const theFd = new FormData()
      theFd.append('photo', e.target.files[0])
      const { data: res } = await updataUserImgAPI(theFd)
      this.userInfoObj.photo = res.data.photo
      this.SET_USERPHOTO(res.data.photo) // 更新后的头像同步到vuex中
    },
    // 图片点击事件
    ImgClickFn () {
      this.$refs.iptFile.click() // js模拟点击事件
    },
    // 姓名点击事件
    nameClickFn () {
      this.changeNameShow = true
      this.userName = this.userInfoObj.name
    },
    //  修改姓名框关闭前的回调
    async beforeCloseFn (action, done) {
      if (action === 'confirm') {
        // 点确定
        // 校验
        const reg = /^[a-zA-Z\u4e00-\u9fa5]{1,7}$/
        if (reg.test(this.userName) === true) {
          await updateUserInfoAPI({
            name: this.userName
          })
          this.userInfoObj.name = this.userName // 更新成功回显到页面上
          this.SET_USERNAME(this.userName)
          // 通过校验，关闭弹窗
          done()
        } else {
          // 没通过校验，提示用户，弹窗不关闭
          Notify({ type: 'warning', message: '请输入1-7位中英文数字组合' })
        }
      } else {
        // 点取消
        done() // 关闭弹窗
      }
    },
    // 生日点击事件
    birthdayClickFn () {
      this.showDate = true
      this.currentDate = new Date(this.userInfoObj.birthday)
    },
    // 取消日期选择器
    dateCancelFn () {
      // 关闭弹出框
      this.showDate = false
    },
    // 确定时间
    async confimDateFn () {
      await updateUserInfoAPI({
        birthday: formatDate(this.currentDate)
      })
      this.userInfoObj.birthday = formatDate(this.currentDate)
      // 关闭弹出框
      this.showDate = false
    }
  }
}
</script>

<style lang="less" scoped>
.user-edit-container {
    padding-top: 46px;
    .avatar {
    width: 50px;
    height: 50px;
    }
}
::v-deep .van-dialog__content{
    display: flex;
    justify-content: center;
    align-items: center;
    input{
        border: none;
        border: none;
        text-align: center;
    }
}
</style>
