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
  }
]

const router = new VueRouter({
  routes
})

export default router
