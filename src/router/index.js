import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    reactive: '/layout/home'
  },
  {
    path: '/login',
    component: () => import('@/views/Login/myLogin.vue')
  },
  {
    path: '/layout',
    component: () => import('@/views/Layout/myLayout.vue'),
    children: [
      {
        path: 'home',
        component: () => import('@/views/Home/myHome.vue')
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
  }
]

const router = new VueRouter({
  routes
})

export default router
