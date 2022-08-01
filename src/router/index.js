import { getToken } from '@/utils/token'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout/home'
  },
  {
    path: '/login',
    component: () => import('@/views/Login/myLogin.vue'),
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      // 有token不能去登录页
      if (getToken()?.length > 0 && to.path === '/login') {
        next('/layout/home') // 阻止放行,强制回首页
      } else {
        next() // 放行
      }
    }
  },
  {
    path: '/layout',
    component: () => import('@/views/Layout/myLayout.vue'),
    children: [
      {
        path: 'home',
        component: () => import('@/views/Home/myHome.vue'),
        meta: {
          scrollT: 0 // 保存首页离开时，滚动条的位置
        }
      },
      {
        path: 'user',
        component: () => import('@/views/User/myUser.vue')
      }
    ]
  },
  {
    path: '/search',
    component: () => import('@/views/Search/searchChannel.vue')
  },
  {
    path: '/search_result/:keyword',
    component: () => import('@/views/Search/searchResult.vue')
  },
  {
    path: '/detail',
    component: () => import('@/views/ArticleDetail/articleDetail.vue')
  },
  {
    path: '/user_edit',
    component: () => import('@/views/User/UserEdit.vue')
  },
  {
    path: '/chat',
    component: () => import('@/views/Chat/xs-Chat.vue')
  }
]

const router = new VueRouter({
  routes
})

// 路由全局守卫（在路由发生真正跳转之前，执行此函数）
// 此函数可以决定路由是否跳转/取消/强制中断到别的路由
// router.beforeEach((to, from, next) => {
//   // 如果已经的登陆了，就不要切到登录页了
//   if (getToken()?.length > 0 && to.path === '/login') {
//     next('/layout/home') // 阻止放行,强制回首页
//   } else {
//     next() // 放行
//   }
// })

export default router
