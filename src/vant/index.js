import Vue from 'vue'
import { NavBar, Form, Field, Button, Tabbar, TabbarItem, Icon, Tab, Tabs, Cell, List, PullRefresh, ActionSheet, Popup, Row, Col, Badge, Search, Image as VanImage, Divider, Tag, CellGroup, Dialog, DatetimePicker, Loading, Lazyload, ShareSheet } from 'vant' // 引入导航组件

Vue.use(NavBar)
Vue.use(Form)
Vue.use(Field)
Vue.use(Button)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Icon)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Cell)
Vue.use(List)
Vue.use(PullRefresh)
Vue.use(ActionSheet)
Vue.use(Popup)
Vue.use(Row)
Vue.use(Col)
Vue.use(Badge)
Vue.use(Search)
Vue.use(VanImage)
Vue.use(Divider)
Vue.use(Tag)
Vue.use(CellGroup)
Vue.use(CellGroup)
Vue.use(Dialog)
Vue.use(DatetimePicker)
Vue.use(Loading)
Vue.use(ShareSheet)
// 注册时可以配置额外的选项
Vue.use(Lazyload, {
  error: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.huabanimg.com%2Ff0f65d6789ff7cd9a6e73ca537cb84ca064e282924bf6-YIYimK_fw658&refer=http%3A%2F%2Fhbimg.huabanimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1661845185&t=18b928a94eb15ea89a7ec54b06584f4e', // 404加载失败的默认图片
  preload: 0.8,
  lazyComponent: true
})
